import { Injectable } from '@angular/core';

export interface DirectoryEntry {
  filesystem: any;
  fullpath: string;
  isDirectory: boolean;
  isFile: boolean;
  name: string;
  createReader();
}

export interface FileEntry {
  filesystem: any;
  fullpath: string;
  isDirectory: boolean;
  isFile: boolean;
  name: string;
  file(successCallBack: Function, errorCallBack: Function);
}

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  async import(dataTransfer: DataTransfer) {
    const entry: any = await new Promise(resolve => setTimeout(resolve, 0, this.validate(dataTransfer)));
    const entries: any = await new Promise(resolve => setTimeout(resolve, 0, this.parseDirectoryEntry(entry)));
    return await new Promise(resolve => setTimeout(resolve, 0, this.getAngularConfig(entries, entry)));
  }

  /**
   * validate dropped item
   * @param dataTransfer DataTransfer
   */
  validate(dataTransfer: DataTransfer) {
    return new Promise((resolve, reject) => {
      if (dataTransfer.items.length > 0) {
        const entry: DirectoryEntry = dataTransfer.items[0].webkitGetAsEntry();
        if (entry && entry.isDirectory) {
          resolve(entry);
        } else {
          reject('Dropped object must be a directory');
        }
      } else {
        reject('Data transfer item is empty');
      }
    });
  }

  /**
   * Read directory entries
   * @param directoryData DirectoryEntry
   */
  parseDirectoryEntry(directoryData: DirectoryEntry) {
    const directoryReader = directoryData.createReader();
    return new Promise((resolve, reject) => {
      directoryReader.readEntries(
        (entries: any[]) => {
          resolve(entries);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * return angular project configuration data
   * @param directoryData any[]
   * @param entry DirectoryEntry
   * @param configData any
   */
  getData(directoryData: any[], entry: DirectoryEntry, configData) {
    return {
      directory: entry.name,
      'skip-git': this.getSkipGitFlag(directoryData),
      'app-name': this.getAppName(configData),
      prefix: this.getPrefix(configData),
      'inline-style': this.getInlineStyle(configData),
      'inline-template': this.getInlineTemplate(configData),
      'skip-tests': this.getSkipTestsFlag(configData),
      style: this.getStyle(configData),
      'skip-install': this.getSkipInstall(directoryData),
      'routing': this.getRoutingFlag(directoryData)
    };
  }

  async getRoutingFlag(directoryData: any[]) {
    const srcDirectory: DirectoryEntry[] = directoryData.filter((entry: DirectoryEntry) => entry.isDirectory && entry.name === 'src');
    if (srcDirectory.length === 1) {
      const srcEntries: any = await new Promise((resolve) => setTimeout(resolve, 0, this.parseDirectoryEntry(srcDirectory[0])));
      const appDirectory: DirectoryEntry[] = srcEntries.filter((entry: DirectoryEntry) => (entry.isDirectory) && entry.name === 'app');
      if (appDirectory.length === 1) {
        const appEntries: any = await new Promise((resolve) => setTimeout(resolve, 0, this.parseDirectoryEntry(appDirectory[0])));
        return (appEntries.filter((entry: FileEntry) => entry.name.lastIndexOf('routing.module.ts') > -1 ).length === 1);
      }
    }
    return false;
  }

  getSkipInstall(directoryData: any[]) {
    return directoryData.filter((entry: any) => (entry.isDirectory && entry.name === 'node_modules')).length === 0;
  }

  /**
   * get style value
   * @param configData any
   */
  getStyle(configData) {
    const schematics = configData[configData.newProjectRoot][configData.defaultProject]['schematics'];
    return schematics['@schematics/angular:component'] ? schematics['@schematics/angular:component']['styleext'] : '';
  }

  /**
   * get skip tests flag
   * @param configData any
   */
  getSkipTestsFlag(configData) {
    const schematics = configData[configData.newProjectRoot][configData.defaultProject]['schematics'];
    return schematics['@schematics/angular:component'] ? !schematics['@schematics/angular:component']['spec'] : false;
  }

  /**
   * get inline template flag
   * @param configData any
   */
  getInlineTemplate(configData) {
    const schematics = configData[configData.newProjectRoot][configData.defaultProject]['schematics'];
    return schematics['@schematics/angular:component'] ? schematics['@schematics/angular:component']['inlineTemplate'] : false;
  }

  /**
   * get inline style flag
   * @param configData any
   */
  getInlineStyle(configData) {
    const schematics = configData[configData.newProjectRoot][configData.defaultProject]['schematics'];
    return schematics['@schematics/angular:component'] ? schematics['@schematics/angular:component']['inlineStyle'] : false;
  }

  /**
   * get application name
   * @param configData any
   */
  getAppName(configData) {
    return configData.defaultProject;
  }

  /**
   * get skip git flag
   * @param entries any[]
   */
  getSkipGitFlag(entries: any[]) {
    return entries.filter((entry: FileEntry) => (entry.isDirectory && entry.name === '.git')).length === 0;
  }

  /**
   * get application prefix
   * @param configData any
   */
  getPrefix(configData) {
    const projectRoot = configData.newProjectRoot;
    return (configData[projectRoot] && configData[projectRoot][configData.defaultProject]) ?
      configData[projectRoot][configData.defaultProject].prefix : '';
  }

  /**
   * read angular.json file
   * @param directoryData any[]
   * @param directoryEntry DirectoryEntry
   */
  getAngularConfig(directoryData: any[], directoryEntry: DirectoryEntry) {
    return new Promise((resolve, reject) => {
      const angularConfig: any[] = directoryData.filter(
        (entry: FileEntry) => (entry.isFile && entry.name === 'angular.json')
      );
      if (angularConfig.length === 1) {
        angularConfig[0].file(
          file => {
            const render = new FileReader();
            render.onloadend = e => {
              const target: FileReader = <FileReader>e.currentTarget;
              resolve(this.getData(directoryData, directoryEntry, JSON.parse(<string>target.result)));
            };
            render.readAsText(file);
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject('angular.json missing');
      }
    });
  }
}
