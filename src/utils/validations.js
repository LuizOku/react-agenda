/**
 * Função para valdar um telefone no formato (99)99999-9999 ou (99)9999-9999.
 */
export const checkPhone = phone => {
  const phoneRegex = new RegExp(/\(\d{2}\)\d{4,5}-\d{4}/g);
  return phoneRegex.test(phone);
};

/**
 * Função para validar um email.
 */
export const checkEmail = email => {
  const regex = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|co|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/g
  );
  return regex.test(String(email).toLowerCase());
};
