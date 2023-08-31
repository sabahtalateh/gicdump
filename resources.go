package main

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

const dir = "build"

var exclude = []string{"build/data.js"}

const t = `package gic

type dumpResource struct {
	file    string
	content string
}

var dumpResources = []dumpResource{
	{{ range $val := . }}
	{
		file: "{{ $val.File }}",
		content: ` + "`" + `{{ $val.Content }}` + "`" + `,
	},
	{{ end }}
}
`

type Resource struct {
	File    string
	Content string
}

func main() {
	var rr []Resource
	err := filepath.Walk(dir, func(path string, info fs.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}

		for _, e := range exclude {
			if e == path {
				return nil
			}
		}

		bb, err := os.ReadFile(path)
		check(err)

		content := string(bb)
		content = strings.ReplaceAll(string(bb), "`", "`+\"`\"+`")
		// content = strings.ReplaceAll(content, "\n", `\n`)

		rr = append(rr, Resource{
			File:    path,
			Content: content,
		})

		// println(path)
		// println(string(bb[:100]))
		return nil
	})

	tmpl, err := template.New("").Parse(t)
	check(err)

	f, err := os.Create("dumpresources.go")
	check(err)

	err = tmpl.Execute(f, rr)
	check(err)
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
