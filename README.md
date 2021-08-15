knightpath
==========

Knightpath cmd

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/knightpath.svg)](https://npmjs.org/package/@knightpath/cli)
[![Downloads/week](https://img.shields.io/npm/dw/knightpath.svg)](https://npmjs.org/package/@knightpath/cli)
[![License](https://img.shields.io/npm/l/knightpath.svg)](https://github.com/knightpath/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @knightpath/cli
$ knightpath COMMAND
running command...
$ knightpath (-v|--version|version)
@knightpath/cli/0.0.3 darwin-x64 node-v14.16.0
$ knightpath --help [COMMAND]
USAGE
  $ knightpath COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`knightpath api-lint DIR`](#knightpath-api-lint-dir)
* [`knightpath api-list DIR`](#knightpath-api-list-dir)
* [`knightpath help [COMMAND]`](#knightpath-help-command)

## `knightpath api-lint DIR`

scan a directory for unofficial/undocumented api

```
USAGE
  $ knightpath api-lint DIR

ARGUMENTS
  DIR  [default: .] directory to scan

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/api-lint.ts](https://github.com/knightpath/cli/blob/v0.0.3/src/commands/api-lint.ts)_

## `knightpath api-list DIR`

Scan directory for APIs

```
USAGE
  $ knightpath api-list DIR

ARGUMENTS
  DIR  [default: .] directory to scan

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  path to output as csv
```

_See code: [src/commands/api-list.ts](https://github.com/knightpath/cli/blob/v0.0.3/src/commands/api-list.ts)_

## `knightpath help [COMMAND]`

display help for knightpath

```
USAGE
  $ knightpath help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
