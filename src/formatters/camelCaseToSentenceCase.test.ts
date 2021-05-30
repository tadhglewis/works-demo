import camelCaseToSentenace from './camelCaseToSentenceCase';

describe('camelCaseToSentenceCase', () => {
  it('should format thisIsATest', () => {
    expect(camelCaseToSentenace('thisIsATest')).toEqual('This is a test');
  });
});
