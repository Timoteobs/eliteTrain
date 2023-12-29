export const maskPhone = (phone: string) => {
  return phone
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
};

type JsonData = {
  [key: string]: string;
};

export const removeMaskFromJSON = (
  json: JsonData,
  keys: string[]
): JsonData => {
  if (!json || typeof json !== "object" || !Array.isArray(keys)) {
    console.error("Argumentos inválidos.");
    return json;
  }

  keys.forEach((key) => {
    if (!(key in json)) {
      console.error(`Chave "${key}" não encontrada no JSON.`);
    } else {
      json[key] = json[key].replace(/\D/g, "");
    }
  });

  return json;
};
