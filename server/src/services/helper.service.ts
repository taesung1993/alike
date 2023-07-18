class HelperService {
  generateRandomNumberForVeirification() {
    const min = 111111;
    const max = 999999;

    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
}

export default new HelperService();
