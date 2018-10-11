# APOLLO (Just Hive Web Posting Service)
Client Side Code for creating Just Hive posts on the web

## Commit Message
All commit messages should have a preface in brackets detailing the primary action of the commit

**INIT** -- Initial commit

**ADD** -- Commit comprised primarily of additions in application code, build tools, dependancies and/or configuration files

**UPDATE** -- Deletions/Changes in configuration files, build tools, updates to dependancies, documentation and possible application code changes relevant to the update

**REFACTOR** -- Commit comprised of both possible additions or deletions of application code for code clarity or performance

**BUGFIX** -- Commit comprised of possible additions or deletions of application code to resolve unintended bugs

**DELETE** -- Commit comprised of deletions or commenting out of application code

### Example commit messages
`[UPDATE] renamed title in Readme`

`[ADD] awesome code for new feature in app`

`[BUGFIX] changed variable to stop infinite for loop`

## Development Workflow

### IMPORTANT!! ###

-- **NEVER** commit `package-lock.json` file changes.  This file commonly changes when adding/deleting/updating npm modules (this will be handled by the repo admin)

-- Commits for an updated `bundle.js` file should always be a separate commit and be the last commit on a branch for a pull request

### Local Environment Setup ###

Run the command

`npm run start`

This will generate a backend that serves the client files and should open up the html file on your preferred browser

Once you have made all of your code changes and commits (not including the bundle.js file changes) and are ready to submit a PR run the command

`npm run build`

This will generate an updated `bundle.js` file that should then be committed on your working branch and pushed up to gitHub before submitting your PR.
"# Apollo" 
