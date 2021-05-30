const camelCaseToSentenace = (camelCase: string) =>
  camelCase.replace(/^[a-z]|[A-Z]/g, (v, i) =>
    i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase(),
  );

export default camelCaseToSentenace;
