import { User } from "../User/user.model";


const findLastBuyerId = async () => {
  const lastBuyer = await User.findOne(
    {
      role: 'Buyer',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBuyer?.id ? lastBuyer.id : undefined;
};

export const generateBuyerId = async () => {
  let currentId = "0"; // default "0000"

  const lastBuyerId = await findLastBuyerId(); // e.g. "Buyer-0007"

  if (lastBuyerId) {
    // remove prefix "Buyer-" and keep last 4 digits
    currentId = lastBuyerId.replace("Buyer-", ""); // "0007"
  }

  // increment and pad with leading zeros
  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  return `Buyer-${incrementId}`; // e.g. "Buyer-0008"
};


// Buyer ID
export const findLastSellerId = async () => {
  const lastSeller = await User.findOne(
    {
      role: 'Seller',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastSeller?.id ? lastSeller.id.substring(2) : undefined;
};

export const generateSellerId = async () => {
  let currentId = (0).toString();
  const lastSellerId = await findLastSellerId();

  if (lastSellerId) {
    currentId = lastSellerId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `Seller-${incrementId}`;

  return incrementId;
};

// Service Provider ID
export const findLastServiceProviderId = async () => {
  const lastServiceProvider = await User.findOne(
    {
      role: 'serviceProvider',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastServiceProvider?.id ? lastServiceProvider.id.substring(2) : undefined;
};

export const generateServiceProviderId = async () => {
  let currentId = (0).toString();
  const lastServiceProviderId = await findLastServiceProviderId();

  if (lastServiceProviderId) {
    currentId = lastServiceProviderId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `ServiceProvider-${incrementId}`;

  return incrementId;
};

// farmer
export const findLastfarmerId = async () => {
  const lastfarmer = await User.findOne(
    {
      role: 'farmer',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastfarmer?.id ? lastfarmer.id.substring(2) : undefined;
};

export const generatefarmerId = async () => {
  let currentId = (0).toString();
  const lastfarmerId = await findLastfarmerId();

  if (lastfarmerId) {
    currentId = lastfarmerId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `farmer-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
