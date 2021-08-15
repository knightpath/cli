import {Command, flags} from '@oclif/command';

import {scanApiInDir, listFilesResults} from '../../api-core';
import {printWelcome} from '../../utils/general';

export default class ApiList extends Command {
  static description = 'Scan directory for APIs'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    output: flags.string({char: 'o', description: 'path to output as csv'}),
  }

  static args = [{
    name: 'dir',
    required: true,
    default: '.',
    description: 'directory to scan'
  }]

  async run() {
    const {args, flags} = this.parse(ApiList)

    printWelcome();
    const files= await scanApiInDir(args.dir);
    
    const {counterUnofficial, counterTotal} = listFilesResults(files);

    console.log('Total APIs: ', counterTotal);
    console.log('Total Unofficial APIs:', counterUnofficial);
  }
}
