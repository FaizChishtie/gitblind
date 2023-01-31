#! /usr/bin/env node
const { program } = require('commander')
const { isCurrentDirAGitRepo, addFileNameToGitExclude, listBlindedFiles, removeBlindedFile, resetGitExclude } = require('./util');

program
    .name('gitblind')
    .description("Keep files in local git repositories that'll never be committed.")
    .version('0.1.0');

program.hook('preAction', () => {
    if (!isCurrentDirAGitRepo()) {
        console.log('Please run gitblind from the root of a git repository.');
        console.log('Could not find a .git directory in the current directory.')
        process.exit(1);
    };
});

program.argument('<blind...>', 'filenames or patterns to blind')
    .description('Blinds files or patterns')
    .action((blinds) => {
        blinds.forEach(blind => {
            console.log(`Blinding ${blind}`);
            addFileNameToGitExclude(blind) ? console.log(`Blinded ${blind}`) : console.log(`Failed to blind ${blind}`);
        });
    });

program.command('ls')
    .description('Lists the contents of the .git/info/exclude file')
    .action(() => {
        const files = listBlindedFiles();
        if (files === false) {
            console.log('Failed to list blinded files');
            return;
        }
        console.log(files);
    });

program.command('rm <blind...>')
    .description('Removes files or patterns from the .git/info/exclude file')
    .action((blinds) => {
        blinds.forEach(blind => {
            console.log(`Removing ${blind}`);
            removeBlindedFile(blind) ? console.log(`Removed ${blind}`) : console.log(`Failed to remove ${blind}`);
        });
    });

program.command('reset')
    .description('Reset the .git/info/exclude file')
    .option('-c, --confirm', 'confirm that you want to reset the .git/info/exclude file')
    .action((options) => {
        if (!options.confirm) {
            return console.log('You must confirm that you want to reset the .git/info/exclude file using the -c or --confirm option');
        }
        console.log('Resetting .git/info/exclude');
        resetGitExclude() ? console.log('Reset .git/info/exclude') : console.log('Failed to reset .git/info/exclude');
    });

program.parse()