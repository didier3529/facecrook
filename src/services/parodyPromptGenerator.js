import ApiService from './ApiService';

const templateMap = {
  cryptoKing: 'CryptoKing says: "{user}"',
  nftQueen: 'NFTQueen responds: "{user}"',
  satoshi: 'Satoshi whispers: "{user}"',
  hodlGuru: 'HODLGuru proclaims: "{user}"'
};

export default async function sendMessage(characterId, userText) {
  if (!Object.prototype.hasOwnProperty.call(templateMap, characterId)) {
    throw new Error(`Unknown characterId: ${characterId}`);
  }
  if (typeof userText !== 'string') {
    throw new Error('userText must be a non-empty string');
  }
  const trimmedText = userText.trim();
  if (!trimmedText) {
    throw new Error('userText must be a non-empty string');
  }
  const prompt = templateMap[characterId].replace(/\{user\}/g, trimmedText);
  try {
    const { data } = await ApiService.post('/ai/chat', { prompt });
    return data;
  } catch (error) {
    throw new Error(`Failed to send AI chat message for characterId "${characterId}": ${error.message}`);
  }
}