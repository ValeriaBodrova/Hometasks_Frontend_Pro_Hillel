function toCamelCase(inputString) {
    if (typeof inputString !== 'string') {
      // Перевірка, чи аргумент є рядком
      return inputString;
    }
  
    return inputString.replace(/([-_][a-z])/ig, (match) => {
      return match.toUpperCase()
                      .replace('-', '')
                      .replace('_', '');
    });
  }
  
  // Приклади використання
  console.log(toCamelCase('hello_world')); // 'helloWorld'
  console.log(toCamelCase('very_long_property_name')); // 'veryLongPropertyName'
  console.log(toCamelCase('kebab-case-key')); // 'kebab-case-key'
  
  // Приклад обробки відповіді від сервера
  const response = {
    user_id: 'abc123',
    company_name: 'Hillel',
    contract_expiration_date: '22/11/2013',
    'secret-token': 'unique$ecret',
  };
  
  let camelCasedResponse = {};
  
  for (let key in response) {
    const newKey = toCamelCase(key);
    camelCasedResponse[newKey] = response[key];
  }
  
  console.log(camelCasedResponse);
  /*{
    userId: 'abc123',
    companyName: 'Hillel',
    contractExpirationDate: '22/11/2013',
    'secret-token': 'unique$ecret', // left as it was
  };*/
  