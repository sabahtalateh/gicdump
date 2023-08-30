var data = {
    "initialized": [{
        "order": 0,
        "type": "*config.Config",
        "id": "",
        "file": "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/config/config.go",
        "line_start": 16,
        "line_end": 34,
        "direct_deps": null
    }, {
        "order": 1,
        "type": "*system.DB",
        "id": "",
        "file": "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/system/db.go",
        "line_start": 28,
        "line_end": 33,
        "direct_deps": [{"type": "*config.Config", "id": ""}]
    }, {
        "order": 2,
        "type": "*repo.UserRepo",
        "id": "UserRepo1",
        "file": "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/repo/user_repo.go",
        "line_start": 28,
        "line_end": 32,
        "direct_deps": [{"type": "*system.DB", "id": ""}]
    }, {
        "order": 3,
        "type": "*repo.UserRepo",
        "id": "UserRepo2",
        "file": "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/repo/user_repo.go",
        "line_start": 33,
        "line_end": 37,
        "direct_deps": [{"type": "*system.DB", "id": ""}]
    }, {
        "order": 4,
        "type": "*service.Mailing",
        "id": "Mailing",
        "file": "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/service/mailing.go",
        "line_start": 37,
        "line_end": 46,
        "direct_deps": [{"type": "*repo.UserRepo", "id": "UserRepo1"}, {"type": "*repo.UserRepo", "id": "UserRepo2"}]
    }],
    "files": {
        "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/config/config.go": ["package config", "", "import (", "\t\"context\"", "\t\"github.com/sabahtalateh/gic\"", "\t\"gopkg.in/yaml.v3\"", "\t\"os\"", ")", "", "type Config struct {", "\tDB struct {", "\t\tDSN string `yaml:\"dsn\"`", "\t} `yaml:\"db\"`", "}", "", "func init() {", "\tgic.Add[*Config](", "\t\tgic.WithInitE(func() (*Config, error) {", "\t\t\tbb, err := os.ReadFile(\"./config.yaml\")", "\t\t\tif err != nil {", "\t\t\t\treturn nil, err", "\t\t\t}", "", "\t\t\tconf := new(Config)", "\t\t\tif err = yaml.Unmarshal(bb, conf); err != nil {", "\t\t\t\treturn nil, err", "\t\t\t}", "", "\t\t\treturn conf, nil", "\t\t}),", "\t\tgic.WithStart(func(ctx context.Context, t *Config) error {", "\t\t\treturn nil", "\t\t}),", "\t)", "}", ""],
        "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/repo/user_repo.go": ["package repo", "", "import (", "\t\"github.com/sabahtalateh/gic\"", "\t\"github.com/sabahtalateh/gic/tests/kind_of_real_project/system\"", ")", "", "type UserRepo struct {", "\tdb *system.DB", "}", "", "func (u *UserRepo) Select(id int) string {", "\tswitch id {", "\tcase 0:", "\t\treturn \"Ivan\"", "\tcase 1:", "\t\treturn \"Petr\"", "\tdefault:", "\t\treturn \"Anonymous\"", "\t}", "}", "", "var Repo1, Repo2 = gic.ID(\"UserRepo1\"), gic.ID(\"UserRepo2\")", "", "// var UserRepo1ID = ic.id()", "// var UserRepo2ID = ic.id()", "", "func init() {", "\tgic.Add[*UserRepo](", "\t\tgic.WithID(Repo1),", "\t\tgic.WithInit(func() *UserRepo { return \u0026UserRepo{db: gic.Get[*system.DB]()} }),", "\t)", "", "\tgic.Add[*UserRepo](", "\t\tgic.WithID(Repo2),", "\t\tgic.WithInit(func() *UserRepo { return \u0026UserRepo{db: gic.Get[*system.DB]()} }),", "\t)", "}", ""],
        "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/service/mailing.go": ["package service", "", "import (", "\t\"fmt\"", "\t\"github.com/sabahtalateh/gic\"", "\t\"github.com/sabahtalateh/gic/tests/kind_of_real_project/repo\"", ")", "", "type Repo interface {", "\tSelect(int) string", "}", "", "type Mailing struct {", "\tuserRepo1 Repo", "\tuserRepo2 Repo", "}", "", "func (m *Mailing) Send() []string {", "\tvar (", "\t\tuu  []string", "\t\tout []string", "\t)", "", "\tfor i := 0; i \u003c 3; i++ {", "\t\tuu = append(uu, m.userRepo1.Select(i))", "\t}", "", "\tfor _, u := range uu {", "\t\tout = append(out, fmt.Sprintf(\"sending message to %s\", u))", "\t}", "", "\treturn out", "}", "", "var MailingID = gic.ID(\"Mailing\")", "", "func init() {", "\tgic.Add[*Mailing](", "\t\tgic.WithID(MailingID),", "\t\tgic.WithInit(func() *Mailing {", "\t\t\treturn \u0026Mailing{", "\t\t\t\tuserRepo1: gic.Get[*repo.UserRepo](gic.WithID(repo.Repo1)),", "\t\t\t\tuserRepo2: gic.Get[*repo.UserRepo](gic.WithID(repo.Repo2)),", "\t\t\t}", "\t\t}),", "\t)", "}", ""],
        "/Users/kravtsov777/Code/go/src/github.com/sabahtalateh/gic/tests/kind_of_real_project/system/db.go": ["package system", "", "import (", "\t\"github.com/sabahtalateh/gic\"", "\t\"github.com/sabahtalateh/gic/tests/kind_of_real_project/config\"", ")", "", "type DB struct {", "\tdsn string", "}", "", "func (d *DB) Query(q string) string {", "\tif q == \"select user where id = 1\" {", "\t\treturn \"Ivan\"", "\t}", "", "\tif q == \"select user where id = 2\" {", "\t\treturn \"Petr\"", "\t}", "", "\tif q == \"select user where id = 3\" {", "\t\treturn \"Vasisualiy\"", "\t}", "", "\treturn \"anonymous\"", "}", "", "func init() {", "\tgic.Add[*DB](", "\t\tgic.WithInit(func() *DB {", "\t\t\treturn \u0026DB{dsn: gic.Get[*config.Config]().DB.DSN}", "\t\t}),", "\t)", "}", ""]
    },
    "stages": [{
        "id": "start", "order": "(No Order)", "parallel": true
    }, {
        "id": "stop",
        "order": "(No Order)",
        "parallel": true
    }],
    "stage_impls": {
        "start": [{"type": "*config.Config", "id": ""}, {
            "type": "*repo.UserRepo",
            "id": "UserRepo1"
        }],
        "stop": [{"type": "*config.Config", "id": ""}]
    }
}
