import * as fromCharacters from './characters.actions';

describe('loadCharacterss', () => {
  it('should return an action', () => {
    expect(fromCharacters.loadCharacterss().type).toBe('[Characters] Load Characterss');
  });
});
