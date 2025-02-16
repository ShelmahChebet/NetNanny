import { Message } from 'wasp/entities'
import { type GetMessages } from 'wasp/server/operations'
import { prisma } from 'wasp/server';

export const getMessages = async (_args:void, context:any) => {
  return await prisma.message.findMany({
    orderBy: { id: 'asc' },
  })
}

export const getMessagesByUserId: GetMessages<
{ user_id: number },
Message[]
>
= async (args, context) => {
  return await context.entities.Message.findMany({
    where: { user_id: args.user_id },
    orderBy: { id: 'asc' },
  })
}

export default getMessages;