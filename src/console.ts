export const namespaceConsole = (namespace: string)=>{
  return (...val: string[])=>{
    console.log(namespace, ...val);
  };
};
