enum MESSAGES{
  PUSH_CODE,
  HOT_RELOAD
}

export type Message = ServerMessage | ClientMessage;

export type ServerMessage = {
  type: MESSAGES.PUSH_CODE,
  data: {
    source: string;
  }
}

export type ClientMessage = {
  type: MESSAGES.HOT_RELOAD,
  data: {
    newSource: string;
  }
}
