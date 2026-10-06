import userRepository from "#/repositories/userRepository";

let isInitialized: boolean | null = null;

async function getIsInitialized(): Promise<boolean> {
  if (isInitialized === null) {
    isInitialized = (await userRepository.getAdminUserCount()) > 0;
  }
  return isInitialized;
}

async function refreshIsInitialized() {
  isInitialized = (await userRepository.getAdminUserCount()) > 0;
}

export default {
  getIsInitialized,
  refreshIsInitialized,
};
