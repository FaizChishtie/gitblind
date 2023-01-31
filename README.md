# gitblind

Version: 1.0.2

Author: [FaizChishtie](https://github.com/FaizChishtie)

Keep files in local git repositories that'll never be committed.

## Why?

Sometimes you need to keep a file in your repository that you don't want to commit. For example, you might have a `local.sh` script file that you don't want to commit to your repository. You could add it to your `.gitignore` file, but that adds unnecessary clutter to that file. `gitblind` solves this problem by blinding files in your repository so that they'll never be committed.

## How?

`gitblind` adds files or patterns you choose to blind to your local `.git/info/exclude` file. This file is not tracked by git, so it won't be committed to your repository.

## Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Blind a file](#blind-a-file)
  - [Blind a pattern](#blind-a-pattern)
  - [List all blinded files](#list-all-blinded-files)
  - [Unblind a file](#unblind-a-file)
  - [Reset all blinded files](#reset-all-blinded-files)

## Installation

You can install `gitblind` with `npm`:

```
npm install -g gitblind
```

You can also install it with `yarn`:

```
yarn global add gitblind
```

## Usage

### Blind a file

Blinding a file is as simple as running `gitblind` in the root of your repository:

```
gitblind .my-secret-file
```

You can also blind multiple files at once:

```
gitblind .my-secret-file .another-secret-file
```

You can also blind a directory:

```
gitblind /my-secret-directory
```

Blinding a directory will blind all files in that directory.

### Blind a pattern

You can also blind a pattern:

```
gitblind *.sh
```

This will blind all files that end in `.sh`.

### List all blinded files

You can list all blinded files by running `gitblind` with the `ls` command:

```
gitblind ls
```

### Unblind a file

You can unblind a file by running `gitblind` with the `rm` command:

```
gitblind rm .my-secret-file
```

You can also unblind multiple files at once:

```
gitblind rm .my-secret-file .another-secret-file
```

You can also unblind a directory:

```
gitblind rm /my-secret-directory
```

### Reset all blinded files

You can reset all blinded files by running `gitblind` with the `reset` command:

> Note: You must use the `-c` flag to confirm that you want to reset all blinded files.

```
gitblind reset -c
```

This will remove all blinded files from your `.git/info/exclude` file.
