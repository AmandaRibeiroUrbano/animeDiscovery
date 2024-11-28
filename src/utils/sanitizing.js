export function sanitizedBug (bug) {
    return bug
      .replace(/ /g, "%20")        
      .replace(/&/g, "%26")         
      .replace(/\(/g, "%28")        
      .replace(/\)/g, "%29")        
      .replace(/\+/g, "%2B");      
  };