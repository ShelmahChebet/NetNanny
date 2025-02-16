import { Message } from 'wasp/entities'
import { type GetMessages } from 'wasp/server/operations'

export const getMessages: GetMessages<
void,
Message[]
>
= async (args, context) => {
  return context.entities.Message.findMany({
    orderBy: { id: 'asc' },
  })
}

export const getMessagesByUserId: GetMessages<
{ user_id: number },
Message[]
>
= async (args, context) => {
  return context.entities.Message.findMany({
    where: { user_id: args.user_id },
    orderBy: { id: 'asc' },
  })
}   