Go to root
1) initialize npm and set up project
    npm install
    npm init

2) To run SASS using node, go to cmd line and enter the following in the root
    npm run scss

To Start in BASH
1) Git pull latest version of master
    git checkout master
    git fetch origin
    git reset --hard origin/master

2) check status
    git status

GIT Commands
1) prepare file for commit
    git add .

2) commit the files with a message
    git commit -m "message"

3) Push files up to database
    git push


GITFlow instructions

1) Create a new feature branch
    git flow feature start feature_branch
    use git noramlly and rememeber to stop scss before finishing

2) Finish feature branch
    git flow feature finish feature_branch

3) Release Branch
    git flow release start 0.1.0

4) Push to master
    git checkout master
    git checkout merge release/0.1.0
    git flow release finish '0.1.0'
