[![Travis Build Status](https://travis-ci.org/lmahistre/github-todo.svg?branch=master)](https://travis-ci.org/lmahistre/github-todo)

# GitHub Todo

GitHub Todo is a serverless todo-list application.

Data is stored in local storage. It can also be stored in a Gist on a GitHub account.

## Installation

### Prerequisite

A GitHub account must be used for data persistence and synchronization. The application can be used without GitHub account, in this case data is stored locally and can be lost if local storage is cleared.

### Setup GitHub account

The data is stored in a Gist. A Gist must exist to receive this data. This Gits may be shared with other application, only a file call `ght.json` is used. The Gist can be either public or private.

A personal access token is used to access the GitHub account. To set up a personal access token, go to "Settings", "Developer settings" then "Personal access tokens". You can either use an existing token, or create a new one. The token must at least have the scope "gist" checked. The token is displayed only once after generation, it must be copied into the configuration file.

### Configuration

* user : user name of the GitHub account
* token : personal access token
* gistId : ID of the Gist used. This ID is visible in the URL of the Gist
