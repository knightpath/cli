import {Command, flags} from '@oclif/command';
import {scanApiInDir, listFilesResults} from '../api-core';
import {printWelcome} from '../utils/general';

export default class ApiLint extends Command {
  static description = 'scan a directory for unofficial/undocumented api'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{
    name: 'dir',
    required: true,
    default: '.',
    description: 'directory to scan'
  }]

  async run() {
    const {args, flags} = this.parse(ApiLint)
    printWelcome();
    const files= await scanApiInDir(args.dir);
    
    const {counterUnofficial, counterTotal} = listFilesResults(files);

    let res;
    if (counterUnofficial == 0) {
        res = 'PASS'
    } else {
        res = 'FAIL'
    }
    console.log('\n----', res, '----')
    console.log('Total APIs: ', counterTotal);
    if (counterUnofficial > 0) {
        console.error('Total Unofficial APIs:', counterUnofficial);
        process.exit(1);
    }
  }
}
