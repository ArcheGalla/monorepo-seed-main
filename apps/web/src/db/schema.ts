import {
  pgTable,
  text,
  jsonb,
  timestamp,
  boolean,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const CurrencyType = pgEnum("currency_type", [
  "gold",
  "sweepstake_redeemable",
  "sweepstake_non_redeemable",
]);

export const userProfiles = pgTable("user_profiles", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid(),
  birthday: timestamp(),
  createdAt: timestamp(),
  email: text(),
  fullName: text(),
  rank: integer(),
  address: jsonb(),
  lastLoginAt: timestamp(),
});

export const wallets = pgTable("wallets", {
  id: uuid().primaryKey().defaultRandom(),
  balance: integer(),
  currencyType: text(), // gold, sweepstake_redeemable, sweepstake_non_redeemable
  lastUpdatedAt: timestamp(),
  isRedeemable: boolean(),
  userId: uuid(),
  updatedAt: timestamp(),
});

// NOT IS USE FOR NOW

// Define enums if they exist in your Supabase schema
// Example:
// export const userRole = pgEnum("user_role", ["admin", "editor", "user"]);

// Define tables

export const actionAuditLogs = pgTable("action_audit_logs", {
  id: uuid().primaryKey().defaultRandom(),
  action: text().notNull(),
  adminUserId: uuid(),
  changes: jsonb(),
  createdAt: timestamp(),
  entityId: text(),
  entityType: text().notNull(),
  ipAddress: text(),
  userAgent: text(),
});

export const adminProfiles = pgTable("admin_profiles", {
  userId: uuid().primaryKey(),
  createdAt: timestamp(),
  email: text(),
  isActive: boolean(),
  name: text(),
  role: text(), //  Use the pgEnum here if you have one
});

export const adminRoles = pgTable("admin_roles", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp(),
  description: text(),
  name: text().notNull(),
  permissions: jsonb(),
});

export const bonusActivationLogs = pgTable("bonus_activation_logs", {
  id: uuid().primaryKey().defaultRandom(),
  activatedAt: timestamp(),
  amount: integer(),
  bonusId: uuid(),
  userId: uuid(),
});

export const bonusDefinitions = pgTable("bonus_definitions", {
  id: uuid().primaryKey().defaultRandom(),
  conditions: jsonb(),
  createdAt: timestamp(),
  createdBy: uuid(),
  currencyType: text(),
  expirationDays: integer(),
  isActive: boolean(),
  name: text().notNull(),
  type: text(),
  updatedAt: timestamp(),
  value: integer().notNull(),
});

export const gameCategories = pgTable("game_categories", {
  id: uuid().primaryKey().defaultRandom(),
  description: text(),
  name: text().notNull(),
});

export const gameProviders = pgTable("game_providers", {
  id: uuid().primaryKey().defaultRandom(),
  apiEndpoint: text(),
  apiKey: text(),
  contactEmail: text(),
  createdAt: timestamp(),
  integrationType: text(),
  isActive: boolean().notNull(),
  name: text().notNull(),
  supportContact: text(),
  updatedAt: timestamp(),
  webhookUrl: text(),
});

export const gameToCategory = pgTable("game_to_category", {
  id: uuid().primaryKey().defaultRandom(),
  assignedAt: timestamp(),
  categoryId: uuid(),
  gameId: uuid(),
});

export const games = pgTable("games", {
  id: uuid().primaryKey().defaultRandom(),
  configuration: jsonb(),
  createdAt: timestamp(),
  description: text(),
  gameType: text(),
  isActive: boolean().notNull(),
  providerId: uuid(),
  subtitle: text(),
  thumbnailUrl: text(),
  title: text().notNull(),
  updatedAt: timestamp(),
  version: text(),
});

export const notificationTemplates = pgTable("notification_templates", {
  id: uuid().primaryKey().defaultRandom(),
  bodyTemplate: text().notNull(),
  channel: text(),
  createdAt: timestamp(),
  createdBy: uuid(),
  titleTemplate: text().notNull(),
  type: text().notNull(),
});

export const paymentTransactionLogs = pgTable("payment_transaction_logs", {
  id: uuid().primaryKey().defaultRandom(),
  amount: integer().notNull(),
  cardType: text(),
  completedAt: timestamp(),
  createdAt: timestamp(),
  currencyType: text(),
  externalReference: text(),
  lastFour: text(),
  paymentMethod: text(),
  paymentProcessorResponse: jsonb(),
  processorFee: integer(),
  status: text(),
  transactionType: text(),
  updatedAt: timestamp(),
  userId: uuid(),
  userMessage: text(),
});

export const payoutRequests = pgTable("payout_requests", {
  id: uuid().primaryKey().defaultRandom(),
  amount: integer().notNull(),
  kycVerified: boolean(),
  paymentDetails: jsonb(),
  paymentMethod: text().notNull(),
  processedAt: timestamp(),
  rejectionReason: text(),
  requestedAt: timestamp(),
  status: text(),
  updatedAt: timestamp(),
  userId: uuid(),
});

export const spinLogs = pgTable("spin_logs", {
  id: uuid().primaryKey().defaultRandom(),
  amountBet: integer(),
  amountWon: integer(),
  bonusFeaturesTriggered: jsonb(),
  createdAt: timestamp(),
  currencyType: text(),
  gameId: uuid(),
  lineValue: integer(),
  linesPlayed: integer(),
  providerId: uuid(),
  roundId: text(),
  sessionId: text(),
  spinResult: jsonb(),
  transactionId: text(),
  userId: uuid(),
});

export const userBonusRecords = pgTable("user_bonus_records", {
  id: uuid().primaryKey().defaultRandom(),
  assignedAt: timestamp(),
  bonusId: uuid(),
  expiresAt: timestamp(),
  isUsed: boolean(),
  percentageUsed: integer(),
  remainingValue: integer(),
  usedAt: timestamp(),
  userId: uuid(),
});

export const userDevices = pgTable("user_devices", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp(),
  deviceId: text(),
  deviceType: text(),
  isTrusted: boolean(),
  lastUsed: timestamp(),
  operatingSystem: text(),
  pushToken: text(),
  userId: uuid(),
});

export const userDocuments = pgTable("user_documents", {
  id: uuid().primaryKey().defaultRandom(),
  documentExpiryDate: timestamp(),
  documentNumber: text(),
  documentPhotoUrl: text(),
  documentType: text(),
  rejectionReason: text(),
  reviewedAt: timestamp(),
  reviewerId: uuid(),
  status: text(),
  submittedAt: timestamp(),
  userId: uuid(),
  verificationAttempts: integer(),
});

export const userNotifications = pgTable("user_notifications", {
  id: uuid().primaryKey().defaultRandom(),
  body: text().notNull(),
  channel: text(),
  createdAt: timestamp(),
  data: jsonb(),
  isRead: boolean(),
  sentAt: timestamp(),
  templateId: uuid(),
  title: text().notNull(),
  userId: uuid(),
});

export const userPreferences = pgTable("user_preferences", {
  userId: uuid().primaryKey(),
  autoSpinSettings: jsonb(),
  language: text(),
  musicEnabled: boolean(),
  notificationSettings: jsonb(),
  soundEnabled: boolean(),
  themePreference: text(),
  updatedAt: timestamp(),
});

export const userSessionRecords = pgTable("user_session_records", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp(),
  device: text(),
  expiredAt: timestamp(),
  ipAddress: text(),
  isActive: boolean(),
  userAgent: text(),
  userId: uuid(),
});

export const walletTransactions = pgTable("wallet_transactions", {
  id: uuid().primaryKey().defaultRandom(),
  amount: integer().notNull(),
  completedAt: timestamp(),
  createdAt: timestamp(),
  currencyType: text(),
  provider: text(),
  source: text().notNull(),
  status: text(),
  transactionReference: text(),
  type: text(),
  userId: uuid(),
  walletId: uuid(),
});

// Define relationships (Important!)
export const actionAuditLogsRelations = relations(
  actionAuditLogs,
  ({ one }) => ({
    adminProfile: one(adminProfiles, {
      fields: [actionAuditLogs.adminUserId],
      references: [adminProfiles.userId],
    }),
  }),
);

export const adminProfilesRelations = relations(adminProfiles, ({ one }) => ({
  adminRole: one(adminRoles, {
    fields: [adminProfiles.role],
    references: [adminRoles.name],
  }),
}));

export const bonusActivationLogsRelations = relations(
  bonusActivationLogs,
  ({ one }) => ({
    bonusDefinition: one(bonusDefinitions, {
      fields: [bonusActivationLogs.bonusId],
      references: [bonusDefinitions.id],
    }),
    userProfile: one(userProfiles, {
      fields: [bonusActivationLogs.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const bonusDefinitionsRelations = relations(
  bonusDefinitions,
  ({ one }) => ({
    adminProfile: one(adminProfiles, {
      fields: [bonusDefinitions.createdBy],
      references: [adminProfiles.userId],
    }),
  }),
);

export const gameToCategoryRelations = relations(gameToCategory, ({ one }) => ({
  gameCategory: one(gameCategories, {
    fields: [gameToCategory.categoryId],
    references: [gameCategories.id],
  }),
  game: one(games, {
    fields: [gameToCategory.gameId],
    references: [games.id],
  }),
}));

export const gamesRelations = relations(games, ({ one }) => ({
  gameProvider: one(gameProviders, {
    fields: [games.providerId],
    references: [gameProviders.id],
  }),
}));

export const notificationTemplatesRelations = relations(
  notificationTemplates,
  ({ one }) => ({
    adminProfile: one(adminProfiles, {
      fields: [notificationTemplates.createdBy],
      references: [adminProfiles.userId],
    }),
  }),
);

export const paymentTransactionLogsRelations = relations(
  paymentTransactionLogs,
  ({ one }) => ({
    userProfile: one(userProfiles, {
      fields: [paymentTransactionLogs.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const payoutRequestsRelations = relations(payoutRequests, ({ one }) => ({
  userProfile: one(userProfiles, {
    fields: [payoutRequests.userId],
    references: [userProfiles.id],
  }),
}));

export const spinLogsRelations = relations(spinLogs, ({ one }) => ({
  game: one(games, {
    fields: [spinLogs.gameId],
    references: [games.id],
  }),
  gameProvider: one(gameProviders, {
    fields: [spinLogs.providerId],
    references: [gameProviders.id],
  }),
  userProfile: one(userProfiles, {
    fields: [spinLogs.userId],
    references: [userProfiles.id],
  }),
}));

export const userBonusRecordsRelations = relations(
  userBonusRecords,
  ({ one }) => ({
    bonusDefinition: one(bonusDefinitions, {
      fields: [userBonusRecords.bonusId],
      references: [bonusDefinitions.id],
    }),
    userProfile: one(userProfiles, {
      fields: [userBonusRecords.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const userDevicesRelations = relations(userDevices, ({ one }) => ({
  userProfile: one(userProfiles, {
    fields: [userDevices.userId],
    references: [userProfiles.id],
  }),
}));

export const userDocumentsRelations = relations(userDocuments, ({ one }) => ({
  adminProfile: one(adminProfiles, {
    fields: [userDocuments.reviewerId],
    references: [adminProfiles.userId],
  }),
  userProfile: one(userProfiles, {
    fields: [userDocuments.userId],
    references: [userProfiles.id],
  }),
}));

export const userNotificationsRelations = relations(
  userNotifications,
  ({ one }) => ({
    notificationTemplate: one(notificationTemplates, {
      fields: [userNotifications.templateId],
      references: [notificationTemplates.id],
    }),
    userProfile: one(userProfiles, {
      fields: [userNotifications.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const userPreferencesRelations = relations(
  userPreferences,
  ({ one }) => ({
    userProfile: one(userProfiles, {
      fields: [userPreferences.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const userSessionRecordsRelations = relations(
  userSessionRecords,
  ({ one }) => ({
    userProfile: one(userProfiles, {
      fields: [userSessionRecords.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const walletTransactionsRelations = relations(
  walletTransactions,
  ({ one }) => ({
    userProfile: one(userProfiles, {
      fields: [walletTransactions.userId],
      references: [userProfiles.id],
    }),
    wallet: one(wallets, {
      fields: [walletTransactions.walletId],
      references: [wallets.id],
    }),
  }),
);

export const walletsRelations = relations(wallets, ({ one }) => ({
  userProfile: one(userProfiles, {
    fields: [wallets.userId],
    references: [userProfiles.id],
  }),
}));
