export const safeParseJson = <T>(jsonString: string)=>{
  try{
    const data = JSON.parse(jsonString) as T;
    return data;
  } 
  catch(e){
    return null;
  }
};
