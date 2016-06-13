import { exec } from 'child_process';


class ElectronPackagerCmd {
    private cmd: string = "electron-packager";
    private sourcedir: string = ".";
    private appname: string = "app";
    private options = {
        platform: "linux",
        arch: "x64",
        out: "release/",
    }
    private ignoreOption: string[] = [
        "node_modules/electron-*",
        "node_modules/electron-*",
        "node_modules/.bin",
        "node_modules/typescript",
        "app/*.ts",
        "app/*.tsx",
        ".git",
    ]
    get fullCmd(): string {
        const options: string = Object.keys(this.options)
            .reduce((prev, current) => `${prev} --${current}=${this.options[current]}`, "");
        const ignoreOption: string = this.ignoreOption
            .reduce((prev, current) => `${prev} --ignore=${current}`, "");
        return `${this.cmd} ${this.sourcedir} ${this.appname} ${options} ${ignoreOption}`
    }
}
const cmd = new ElectronPackagerCmd().fullCmd;

exec(cmd, (error: Error, stdout: string, stderr: string) => {
    const log = console.log;
    log(`error: ${error}`);
    log(`stdout: ${stdout}`);
    log(`stderr: ${stderr}`);
})
