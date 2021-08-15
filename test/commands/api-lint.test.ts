import {expect, test} from '@oclif/test'

describe('api-lint', () => {
  test
  .stdout()
  .command(['api-lint'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['api-lint', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
