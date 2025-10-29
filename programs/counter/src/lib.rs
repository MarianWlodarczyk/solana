use anchor_lang::prelude::*;

declare_id!("Counter111111111111111111111111111111111111"); // replace with deployed program id if you want a fixed id

#[program]
pub mod counter {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let c = &mut ctx.accounts.counter;
        c.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<UpdateCounter>) -> Result<()> {
        let c = &mut ctx.accounts.counter;
        c.count = c.count.checked_add(1).ok_or(ErrorCode::Overflow)?;
        Ok(())
    }

    pub fn decrement(ctx: Context<UpdateCounter>) -> Result<()> {
        let c = &mut ctx.accounts.counter;
        c.count = c.count.checked_sub(1).ok_or(ErrorCode::Underflow)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCounter<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[account]
pub struct Counter {
    pub count: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Integer overflow")]
    Overflow,
    #[msg("Integer underflow")]
    Underflow,
}