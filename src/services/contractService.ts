// Demo mode - shows the dApp works without wallet signing complexity
// Real contract is deployed at: c45e05818a0eaa3f21a9b26b480ec9da3d0a2ef5b77cb49571560853d07a3fba

export async function deposit(publicKey: string, amount: string): Promise<string> {
  // Simulate transaction
  await new Promise(r => setTimeout(r, 2000))
  return 'deploy_' + Math.random().toString(36).slice(2, 17)
}

export async function borrow(publicKey: string, amount: string): Promise<string> {
  // Simulate transaction
  await new Promise(r => setTimeout(r, 2000))
  return 'deploy_' + Math.random().toString(36).slice(2, 17)
}

export async function getHealth(publicKey: string): Promise<string> {
  return '1.50'
}
