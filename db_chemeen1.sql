/*
 Navicat Premium Dump SQL

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : db_chemeen1

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 14/10/2025 05:38:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_banks
-- ----------------------------
DROP TABLE IF EXISTS `tbl_banks`;
CREATE TABLE `tbl_banks`  (
  `bankId` int NOT NULL AUTO_INCREMENT,
  `bankName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `acNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `swift` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IFSCCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pinCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`bankId`) USING BTREE,
  UNIQUE INDEX `bankName`(`bankName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_banks
-- ----------------------------
INSERT INTO `tbl_banks` VALUES (1, 'Payoneer', '10239', '1923', '18238', 'NJ,NJ,Us', '', 'NJ,', 'NJ', 'Us', '12039', '', '', '', '2024-11-20 07:30:31', '2024-11-20 07:30:31');
INSERT INTO `tbl_banks` VALUES (2, 'Paypal', '10239', '10293', '4823', 'Ny, Ny, US', '', 'NY', 'NY', 'US', '1230', '', '', '', '2024-11-20 07:30:53', '2024-11-20 07:30:53');
INSERT INTO `tbl_banks` VALUES (3, 'JP Morgan Chase Bank ', '20000011141367', 'CHASUS33', '21000021', 'JP Morgan Chase ', '', 'New York ', 'New York ', 'USA', '10017', '', '', '', '2025-07-03 06:28:38', '2025-07-03 06:28:38');
INSERT INTO `tbl_banks` VALUES (4, 'Indian Bank ', '7539783125', 'IDIBINBBMAS', 'IDBI000T014', 'T.Nagar, Chennai ', '', 'Chennai ', 'Tamil Nadu ', 'India ', '600017', '', '', '', '2025-07-03 11:14:30', '2025-07-03 11:14:30');

-- ----------------------------
-- Table structure for tbl_bar
-- ----------------------------
DROP TABLE IF EXISTS `tbl_bar`;
CREATE TABLE `tbl_bar`  (
  `BARId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ItemId` int NOT NULL,
  `analysisDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `completionDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `totalPlateCnt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ECFU` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `SCFU` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salmone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vibrioC` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vibrioP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `listeria` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`BARId`) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  CONSTRAINT `tbl_bar_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_bar
-- ----------------------------
INSERT INTO `tbl_bar` VALUES (1, 8, '3L04', 1, '2025-09-10', '2025-09-03', '1', '2', '2', '2', '2', '2', '1', '2025-09-09 19:00:33', '2025-09-09 19:12:27');
INSERT INTO `tbl_bar` VALUES (2, 8, '3L05', 2, '2025-09-17', '2025-09-26', '2', '1', '1', '1', '12', '2', '2', '2025-09-09 19:00:33', '2025-09-09 19:12:27');
INSERT INTO `tbl_bar` VALUES (3, 9, 'LOSA1', 9, '2025-09-11', '2025-09-17', '1', '1', '1', '1', '1', '1', '1', '2025-09-10 07:13:43', '2025-09-10 07:13:43');
INSERT INTO `tbl_bar` VALUES (4, 11, 'PSO', 11, '2025-09-16', '2025-09-26', '1', '2', '2', '3', '1', '2', '2', '2025-09-10 19:09:27', '2025-09-10 19:09:27');
INSERT INTO `tbl_bar` VALUES (5, 12, 'AAA01', 13, '2025-09-12', '2025-09-12', '1', '2', '2', '3', '4', '5', '6', '2025-09-11 02:02:59', '2025-09-11 02:02:59');
INSERT INTO `tbl_bar` VALUES (6, 13, 'CL03', 15, '2025-09-26', '2025-09-30', '45000', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-09-27 02:47:17', '2025-09-28 15:44:32');
INSERT INTO `tbl_bar` VALUES (7, 13, 'CL01', 15, '2025-09-18', '2025-09-26', '12000', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-09-27 02:47:17', '2025-09-28 15:44:32');
INSERT INTO `tbl_bar` VALUES (8, 13, 'CL03', 16, '2025-09-25', '2025-09-30', '47000', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-09-28 15:44:32', '2025-09-28 15:44:32');
INSERT INTO `tbl_bar` VALUES (11, 16, '3L05', 26, '2025-10-09', '2025-10-16', '1', '1', '1', '11', '1', '1', '1', '2025-10-09 03:14:28', '2025-10-09 03:14:28');

-- ----------------------------
-- Table structure for tbl_code_list
-- ----------------------------
DROP TABLE IF EXISTS `tbl_code_list`;
CREATE TABLE `tbl_code_list`  (
  `codeId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NULL DEFAULT NULL,
  `ItemId` int NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `farmId` int NULL DEFAULT NULL,
  `PRSGId` int NULL DEFAULT NULL,
  `value` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codeId`) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  INDEX `ItemId`(`ItemId` ASC) USING BTREE,
  INDEX `farmId`(`farmId` ASC) USING BTREE,
  INDEX `PRSGId`(`PRSGId` ASC) USING BTREE,
  CONSTRAINT `tbl_code_list_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_code_list_ibfk_2` FOREIGN KEY (`ItemId`) REFERENCES `tbl_items` (`ItemId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_code_list_ibfk_3` FOREIGN KEY (`farmId`) REFERENCES `tbl_companies` (`companyId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tbl_code_list_ibfk_4` FOREIGN KEY (`PRSGId`) REFERENCES `tbl_prsg` (`PRSGId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 106 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_code_list
-- ----------------------------
INSERT INTO `tbl_code_list` VALUES (45, 8, 1, '3L05', 15, 27, 1, '2025-09-10 06:07:39', '2025-09-10 06:07:39');
INSERT INTO `tbl_code_list` VALUES (46, 8, 1, '3L05', 15, 25, 1, '2025-09-10 06:07:39', '2025-09-10 06:07:39');
INSERT INTO `tbl_code_list` VALUES (47, 8, 1, '3L05', 15, 26, 1, '2025-09-10 06:07:39', '2025-09-10 06:07:39');
INSERT INTO `tbl_code_list` VALUES (51, 9, 10, 'LOSA12', 1, 18, 10, '2025-09-10 07:00:24', '2025-09-10 07:00:46');
INSERT INTO `tbl_code_list` VALUES (52, 9, 10, 'LOSA12', 1, 15, 10, '2025-09-10 07:00:24', '2025-09-10 07:00:46');
INSERT INTO `tbl_code_list` VALUES (53, 9, 10, 'LOSA12', 1, 14, 2, '2025-09-10 07:00:24', '2025-09-10 07:00:46');
INSERT INTO `tbl_code_list` VALUES (57, 9, 10, 'LSO', 14, 18, 10, '2025-09-10 07:09:00', '2025-09-10 07:09:00');
INSERT INTO `tbl_code_list` VALUES (58, 9, 10, 'LSO', 14, 15, 10, '2025-09-10 07:09:00', '2025-09-10 07:09:00');
INSERT INTO `tbl_code_list` VALUES (59, 9, 10, 'LSO', 14, 14, 2, '2025-09-10 07:09:00', '2025-09-10 07:09:00');
INSERT INTO `tbl_code_list` VALUES (60, 11, 11, 'PSO', 15, 27, 1, '2025-09-10 19:03:53', '2025-09-10 19:03:53');
INSERT INTO `tbl_code_list` VALUES (61, 11, 11, 'PSO', 15, 25, 4, '2025-09-10 19:03:53', '2025-09-10 19:03:53');
INSERT INTO `tbl_code_list` VALUES (62, 11, 11, 'PSO', 15, 26, 20, '2025-09-10 19:03:53', '2025-09-10 19:03:53');
INSERT INTO `tbl_code_list` VALUES (63, 11, 12, 'SLE', 14, 22, 1, '2025-09-10 21:12:13', '2025-09-10 21:12:13');
INSERT INTO `tbl_code_list` VALUES (64, 11, 12, 'SLE', 14, 21, 2, '2025-09-10 21:12:13', '2025-09-10 21:12:13');
INSERT INTO `tbl_code_list` VALUES (65, 12, 13, 'AAA01', 15, 27, 30, '2025-09-11 01:41:58', '2025-09-11 01:41:58');
INSERT INTO `tbl_code_list` VALUES (66, 12, 13, 'AAA01', 15, 26, 30, '2025-09-11 01:41:58', '2025-09-11 01:41:58');
INSERT INTO `tbl_code_list` VALUES (67, 12, 13, 'AAA01', 15, 25, 40, '2025-09-11 01:41:58', '2025-09-11 01:41:58');
INSERT INTO `tbl_code_list` VALUES (68, 12, 14, 'AAA04', 14, 24, 10, '2025-09-11 01:50:33', '2025-09-11 01:50:33');
INSERT INTO `tbl_code_list` VALUES (69, 12, 14, 'AAA04', 14, 23, 90, '2025-09-11 01:50:33', '2025-09-11 01:50:33');
INSERT INTO `tbl_code_list` VALUES (70, 13, 15, 'CL01', 15, 24, 10, '2025-09-24 06:54:42', '2025-09-24 06:54:42');
INSERT INTO `tbl_code_list` VALUES (71, 13, 15, 'CL01', 15, 23, 15, '2025-09-24 06:54:42', '2025-09-24 06:54:42');
INSERT INTO `tbl_code_list` VALUES (72, 13, 16, 'CL03', 14, 3, 12, '2025-09-24 06:55:07', '2025-09-24 06:55:07');
INSERT INTO `tbl_code_list` VALUES (73, 13, 16, 'CL03', 14, 4, 15, '2025-09-24 06:55:07', '2025-09-24 06:55:07');
INSERT INTO `tbl_code_list` VALUES (74, 13, 16, 'CL03', 14, 1, 3, '2025-09-24 06:55:07', '2025-09-24 06:55:07');
INSERT INTO `tbl_code_list` VALUES (75, 13, 15, 'CL03', 1, 24, 20, '2025-09-24 06:56:52', '2025-09-24 06:56:52');
INSERT INTO `tbl_code_list` VALUES (76, 13, 15, 'CL03', 1, 23, 5, '2025-09-24 06:56:52', '2025-09-24 06:56:52');
INSERT INTO `tbl_code_list` VALUES (81, 14, 21, 'MLA01', 1, 22, 12, '2025-10-07 05:43:49', '2025-10-07 05:43:49');
INSERT INTO `tbl_code_list` VALUES (82, 14, 21, 'MLA01', 1, 21, 18, '2025-10-07 05:43:49', '2025-10-07 05:43:49');
INSERT INTO `tbl_code_list` VALUES (87, 15, 24, '4G14', 15, 4, 11, '2025-10-07 07:51:20', '2025-10-07 07:51:20');
INSERT INTO `tbl_code_list` VALUES (88, 15, 24, '4G14', 15, 3, 15, '2025-10-07 07:51:20', '2025-10-07 07:51:20');
INSERT INTO `tbl_code_list` VALUES (89, 15, 24, '4G14', 15, 1, 4, '2025-10-07 07:51:20', '2025-10-07 07:51:20');
INSERT INTO `tbl_code_list` VALUES (90, 15, 25, '2Fqw', 1, 22, 5, '2025-10-07 07:52:11', '2025-10-07 07:52:11');
INSERT INTO `tbl_code_list` VALUES (91, 15, 25, '2Fqw', 1, 21, 6, '2025-10-07 07:52:11', '2025-10-07 07:52:11');
INSERT INTO `tbl_code_list` VALUES (92, 16, 26, '3L05', 1, 24, 12, '2025-10-07 07:54:27', '2025-10-07 07:54:27');
INSERT INTO `tbl_code_list` VALUES (93, 16, 26, '3L05', 1, 23, 18, '2025-10-07 07:54:27', '2025-10-08 07:07:24');
INSERT INTO `tbl_code_list` VALUES (101, 16, 48, '3MLS', 1, 24, 10, '2025-10-09 01:28:03', '2025-10-09 01:28:03');
INSERT INTO `tbl_code_list` VALUES (102, 16, 48, '3MLS', 1, 23, 14, '2025-10-09 01:28:03', '2025-10-09 01:28:03');
INSERT INTO `tbl_code_list` VALUES (103, 16, 49, 'LMA', 1, 27, 4, '2025-10-09 01:28:28', '2025-10-09 01:28:28');
INSERT INTO `tbl_code_list` VALUES (104, 16, 49, 'LMA', 1, 26, 5, '2025-10-09 01:28:28', '2025-10-09 01:28:28');
INSERT INTO `tbl_code_list` VALUES (105, 16, 49, 'LMA', 1, 25, 6, '2025-10-09 01:28:28', '2025-10-09 01:28:28');

-- ----------------------------
-- Table structure for tbl_companies
-- ----------------------------
DROP TABLE IF EXISTS `tbl_companies`;
CREATE TABLE `tbl_companies`  (
  `companyId` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `companyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `approvalNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pinCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`companyId`) USING BTREE,
  UNIQUE INDEX `companyName`(`companyName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_companies
-- ----------------------------
INSERT INTO `tbl_companies` VALUES (1, 'Farmer', 'GIMMS', 'ML-1023', 'NJK, NJ, US', '', 'NJ', 'NJ', 'US', '120394', '', '', '', '2024-11-20 07:28:55', '2025-06-30 14:21:12');
INSERT INTO `tbl_companies` VALUES (2, 'Processor', 'BUSSU', 'MK-p0239', 'NJ, NJ, US', '', 'NJ', 'NJ', 'US', '10293', '', '', '', '2024-11-20 07:29:20', '2024-11-20 07:29:20');
INSERT INTO `tbl_companies` VALUES (3, 'Consignee', 'MEMU', 'ML-1023', 'MK, MK, US', '', 'MK, ', 'MK', 'US', '12304', '', '', '', '2024-11-20 07:29:44', '2025-06-30 14:21:04');
INSERT INTO `tbl_companies` VALUES (4, 'Exporter', 'ChatGPT', '01923-', 'asdf', '', 'asdf', 'asdf', 'asdf', '123', '', '', '', '2024-11-20 07:30:07', '2025-06-30 14:22:24');
INSERT INTO `tbl_companies` VALUES (5, 'Exporter', 'TECNOMADE', '123123', 'NK, clifton, US', '', 'Clifton', 'TX', 'US', '1092', '', '', '', '2025-07-02 18:07:57', '2025-07-02 18:07:57');
INSERT INTO `tbl_companies` VALUES (6, 'Processor', 'THARANGINI SEA FOODS ', '1904', '4/210, MGR ROAD, PALAVAKKAM ', '', 'Chennai ', 'Tamil Nadu ', 'India ', '600041', '', '', '', '2025-07-03 05:59:11', '2025-07-03 05:59:11');
INSERT INTO `tbl_companies` VALUES (7, 'Exporter', 'GAYATHRI AQUA PRODUCTS PVT LTD', '1904', 'H,NO.8, CHILLAKUR VILLAGE, ', '', 'NELLORE ', 'Andhra Pradesh ', 'India', '524112', '', '', 'gayathri@gmail.com', '2025-07-03 06:02:17', '2025-07-03 06:02:17');
INSERT INTO `tbl_companies` VALUES (8, 'Consignee', 'CHONGQING GUOZHAN INDUSTRIAL CO, LTD', '1', '21, First floor, 329, Minsheng Road, Yuzhong District,  ', '', 'Chongqing', 'Chongqing ', 'China', '91500103709470501W', '', '', '', '2025-07-03 06:09:04', '2025-07-03 06:09:04');
INSERT INTO `tbl_companies` VALUES (9, 'Consignee', 'Matsuoka Co, Ltd', '1', '1-10-12 HIGASY-YAMATOMACHI', '', 'SHIMONOSKEI ', 'YAMAGUCHI PREFECTURE ', 'JAPAN ', '7508512', '', '', '', '2025-07-03 11:08:58', '2025-07-03 11:08:58');
INSERT INTO `tbl_companies` VALUES (10, 'Consignee', 'M/s. YOKOHAMA REITO CO., LTD.', '1', ' MINATOMIRAI GRAND CENTRAL TOWER. 7th FLOOR,  4-6-2, MINATOMIRAI, NISHI-KU,', '', 'YOKOHAMA ', 'YOKOHAMA ', 'Japan ', '2200012', '', '', '', '2025-07-03 11:35:27', '2025-07-03 11:35:27');
INSERT INTO `tbl_companies` VALUES (11, 'Consignee', 'METAREX  SPA', '1', 'VIA.S.PELLICO, 1/A', '', 'MARCON', 'VENEZIA', 'Italy ', '30020', '', '', '', '2025-07-03 11:50:00', '2025-07-03 11:50:00');
INSERT INTO `tbl_companies` VALUES (12, 'Exporter', 'THARANGINI SEAFOODS ', '1094', '4/210, MGR ROAD, PALAVAKKAM ', '', 'Chennai ', 'Tamil Nadu ', 'India ', '600 041', '', '', '', '2025-07-03 11:56:35', '2025-07-03 11:56:35');
INSERT INTO `tbl_companies` VALUES (13, 'Consignee', 'Vietnam Rich Beauty Foods Co., Ltd', '1', 'Tun son Fish Harbour, Quang Long Doai village', '', 'Thai Thuy', 'Thai Binh Provience', 'Vietnam ', '1234', '', '', '', '2025-07-05 04:59:44', '2025-07-05 04:59:44');
INSERT INTO `tbl_companies` VALUES (14, 'Farmer', 'Anbu', 'TRG-2024-01- 24', 'Cuddalore', '', 'Cuddalore', 'Tamil Nadu ', 'India ', '600123', '', '', '', '2025-07-05 06:07:23', '2025-07-05 06:07:23');
INSERT INTO `tbl_companies` VALUES (15, 'Farmer', 'Laxmi ', 'IND-TN-14- 002', 'Chennai Royapuram ', '', 'Chennai ', 'Tamil Nadu ', 'India ', '600001', '', '', '', '2025-07-05 06:09:43', '2025-07-05 06:09:43');
INSERT INTO `tbl_companies` VALUES (16, 'Consignee', ' Ocean Blue Fisheries ', '1', '489 Acadie Ave, Dieppe,  Canada', '', 'Dieppe, NB E1A 1T6,', 'Moncton ', 'Canada ', 'NB E1A 1T7', '', '', '', '2025-07-07 12:57:48', '2025-07-07 12:57:48');

-- ----------------------------
-- Table structure for tbl_elisa
-- ----------------------------
DROP TABLE IF EXISTS `tbl_elisa`;
CREATE TABLE `tbl_elisa`  (
  `elisaId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NULL DEFAULT NULL,
  `ItemId` int NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `testReportNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `testReportDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rawMeterialDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `productionCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sampleDrawnBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sampleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rawMaterialType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rawMaterialReceived` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pondId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `samplingDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `samplingReceiptDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `testedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`elisaId`) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  CONSTRAINT `tbl_elisa_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_elisa
-- ----------------------------
INSERT INTO `tbl_elisa` VALUES (1, 12, 13, 'AAA01', 'aaa', '2025-09-01T04:35:00.000Z', '2025-09-09T04:35:00.000Z', '', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa', '2025-09-30T04:35:00.000Z', '2025-09-17T04:35:00.000Z', 'aaa', '2025-09-11 04:35:46', '2025-09-11 04:35:46');
INSERT INTO `tbl_elisa` VALUES (2, 12, 14, 'AAA04', 'bbb111', '2025-09-01T04:37:00.000Z', '2025-09-24T04:37:00.000Z', '', 'bbb', 'bbb', 'bbb', 'bb', 'bbb', '2025-09-22T04:38:00.000Z', '2025-09-30T04:38:00.000Z', 'bbb', '2025-09-11 04:38:13', '2025-09-11 04:44:34');

-- ----------------------------
-- Table structure for tbl_elisa_detail
-- ----------------------------
DROP TABLE IF EXISTS `tbl_elisa_detail`;
CREATE TABLE `tbl_elisa_detail`  (
  `elisaDetailId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NULL DEFAULT NULL,
  `elisaId` int NULL DEFAULT NULL,
  `testId` int NULL DEFAULT NULL,
  `analytical` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `testResult` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `detectionLimit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`elisaDetailId`) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  INDEX `elisaId`(`elisaId` ASC) USING BTREE,
  INDEX `testId`(`testId` ASC) USING BTREE,
  CONSTRAINT `tbl_elisa_detail_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_elisa_detail_ibfk_2` FOREIGN KEY (`elisaId`) REFERENCES `tbl_elisa` (`elisaId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_elisa_detail_ibfk_3` FOREIGN KEY (`testId`) REFERENCES `tbl_test` (`testId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_elisa_detail
-- ----------------------------
INSERT INTO `tbl_elisa_detail` VALUES (1, 12, 1, 1, 'ELISA', '2', '1', '2025-09-11 04:35:46', '2025-09-11 04:35:46');
INSERT INTO `tbl_elisa_detail` VALUES (2, 12, 1, 2, 'ELISA', '4', '3', '2025-09-11 04:35:46', '2025-09-11 04:35:46');
INSERT INTO `tbl_elisa_detail` VALUES (3, 12, 1, 3, 'ELISA', '', '', '2025-09-11 04:35:46', '2025-09-11 04:35:46');
INSERT INTO `tbl_elisa_detail` VALUES (4, 12, 1, 4, 'ELISA', '', '', '2025-09-11 04:35:46', '2025-09-11 04:35:46');
INSERT INTO `tbl_elisa_detail` VALUES (5, 12, 1, 5, 'ELISA', '', '', '2025-09-11 04:35:46', '2025-09-11 04:35:46');
INSERT INTO `tbl_elisa_detail` VALUES (11, 12, 2, 1, 'ELISA', '2', '1', '2025-09-11 04:44:34', '2025-09-11 04:44:34');
INSERT INTO `tbl_elisa_detail` VALUES (12, 12, 2, 2, 'ELISA', '2', '', '2025-09-11 04:44:34', '2025-09-11 04:44:34');
INSERT INTO `tbl_elisa_detail` VALUES (13, 12, 2, 3, 'ELISA', '22', '', '2025-09-11 04:44:34', '2025-09-11 04:44:34');
INSERT INTO `tbl_elisa_detail` VALUES (14, 12, 2, 4, 'ELISA', '2', '', '2025-09-11 04:44:34', '2025-09-11 04:44:34');
INSERT INTO `tbl_elisa_detail` VALUES (15, 12, 2, 5, 'ELISA', '2', '', '2025-09-11 04:44:34', '2025-09-11 04:44:34');

-- ----------------------------
-- Table structure for tbl_item_details
-- ----------------------------
DROP TABLE IF EXISTS `tbl_item_details`;
CREATE TABLE `tbl_item_details`  (
  `itemDetailId` int NOT NULL AUTO_INCREMENT,
  `ItemId` int NULL DEFAULT NULL,
  `PRSGId` int NULL DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cartons` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `kgQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usdRate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usdAmount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`itemDetailId`) USING BTREE,
  INDEX `ItemId`(`ItemId` ASC) USING BTREE,
  INDEX `PRSGId`(`PRSGId` ASC) USING BTREE,
  CONSTRAINT `tbl_item_details_ibfk_1` FOREIGN KEY (`ItemId`) REFERENCES `tbl_items` (`ItemId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_item_details_ibfk_2` FOREIGN KEY (`PRSGId`) REFERENCES `tbl_prsg` (`PRSGId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 157 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_item_details
-- ----------------------------
INSERT INTO `tbl_item_details` VALUES (7, 2, 20, '61UP', '1', '10.00', '1', '10.00', '2025-09-09 01:45:22', '2025-09-09 01:45:22');
INSERT INTO `tbl_item_details` VALUES (8, 2, 19, '41/60', '2', '20.00', '2', '40.00', '2025-09-09 01:45:22', '2025-09-09 01:45:22');
INSERT INTO `tbl_item_details` VALUES (17, 3, 23, '16/20', '2', '100.00', '2', '200.00', '2025-09-09 05:25:15', '2025-09-09 05:25:15');
INSERT INTO `tbl_item_details` VALUES (18, 3, 24, '21/25', '12', '600.00', '10', '6000.00', '2025-09-09 05:25:15', '2025-09-09 05:25:15');
INSERT INTO `tbl_item_details` VALUES (19, 1, 27, '700/900', '1', '5.00', '10', '50.00', '2025-09-09 07:29:10', '2025-09-09 07:29:10');
INSERT INTO `tbl_item_details` VALUES (20, 1, 25, '1000/UP', '1', '5.00', '1', '5.00', '2025-09-09 07:29:10', '2025-09-09 07:29:10');
INSERT INTO `tbl_item_details` VALUES (21, 1, 26, '900/1000', '1', '5.00', '1', '5.00', '2025-09-09 07:29:10', '2025-09-09 07:29:10');
INSERT INTO `tbl_item_details` VALUES (28, 8, 18, 'All sizes ', '10', '20.00', '10', '200.00', '2025-09-10 04:58:06', '2025-09-10 04:58:06');
INSERT INTO `tbl_item_details` VALUES (29, 8, 15, '300/UP', '10', '20.00', '10', '200.00', '2025-09-10 04:58:06', '2025-09-10 04:58:06');
INSERT INTO `tbl_item_details` VALUES (30, 8, 14, '250/300', '10', '20.00', '100', '2000.00', '2025-09-10 04:58:06', '2025-09-10 04:58:06');
INSERT INTO `tbl_item_details` VALUES (37, 9, 27, '700/900', '2', '21.60', '10', '216.00', '2025-09-10 06:57:31', '2025-09-10 06:57:31');
INSERT INTO `tbl_item_details` VALUES (38, 9, 26, '900/1000', '12', '129.60', '10', '1296.00', '2025-09-10 06:57:31', '2025-09-10 06:57:31');
INSERT INTO `tbl_item_details` VALUES (39, 9, 25, '1000/UP', '2', '21.60', '10', '216.00', '2025-09-10 06:57:31', '2025-09-10 06:57:31');
INSERT INTO `tbl_item_details` VALUES (43, 10, 18, 'All sizes ', '12', '288.00', '10', '2880.00', '2025-09-10 06:58:29', '2025-09-10 06:58:29');
INSERT INTO `tbl_item_details` VALUES (44, 10, 15, '300/UP', '10', '240.00', '1', '240.00', '2025-09-10 06:58:29', '2025-09-10 06:58:29');
INSERT INTO `tbl_item_details` VALUES (45, 10, 14, '250/300', '', '', '', '', '2025-09-10 06:58:29', '2025-09-10 06:58:29');
INSERT INTO `tbl_item_details` VALUES (46, 11, 27, '700/900', '12', '60.00', '10', '600.00', '2025-09-10 19:03:09', '2025-09-10 19:03:09');
INSERT INTO `tbl_item_details` VALUES (47, 11, 26, '900/1000', '12', '60.00', '10', '600.00', '2025-09-10 19:03:09', '2025-09-10 19:03:09');
INSERT INTO `tbl_item_details` VALUES (48, 11, 25, '1000/UP', '1', '5.00', '20', '100.00', '2025-09-10 19:03:09', '2025-09-10 19:03:09');
INSERT INTO `tbl_item_details` VALUES (49, 12, 22, '61UP', '1', '10.00', '2', '20.00', '2025-09-10 20:00:15', '2025-09-10 20:00:15');
INSERT INTO `tbl_item_details` VALUES (50, 12, 21, '41/60', '2', '20.00', '2', '40.00', '2025-09-10 20:00:15', '2025-09-10 20:00:15');
INSERT INTO `tbl_item_details` VALUES (51, 13, 27, '700/900', '50', '2500.00', '10', '25000.00', '2025-09-11 01:40:41', '2025-09-11 01:40:41');
INSERT INTO `tbl_item_details` VALUES (52, 13, 26, '900/1000', '15', '750.00', '20', '15000.00', '2025-09-11 01:40:41', '2025-09-11 01:40:41');
INSERT INTO `tbl_item_details` VALUES (53, 13, 25, '1000/UP', '35', '1750.00', '30', '52500.00', '2025-09-11 01:40:41', '2025-09-11 01:40:41');
INSERT INTO `tbl_item_details` VALUES (54, 14, 24, '21/25', '50', '500.00', '100', '50000.00', '2025-09-11 01:45:03', '2025-09-11 01:45:03');
INSERT INTO `tbl_item_details` VALUES (55, 14, 23, '16/20', '50', '500.00', '10', '5000.00', '2025-09-11 01:45:03', '2025-09-11 01:45:03');
INSERT INTO `tbl_item_details` VALUES (56, 15, 24, '21/25', '10', '100.00', '20', '2000.00', '2025-09-11 06:09:19', '2025-09-11 06:09:19');
INSERT INTO `tbl_item_details` VALUES (57, 15, 23, '16/20', '15', '150.00', '20', '3000.00', '2025-09-11 06:09:19', '2025-09-11 06:09:19');
INSERT INTO `tbl_item_details` VALUES (58, 16, 4, '31/40', '5', '50.00', '20', '1000.00', '2025-09-24 06:53:51', '2025-09-24 06:53:51');
INSERT INTO `tbl_item_details` VALUES (59, 16, 3, '26/30', '10', '100.00', '20', '2000.00', '2025-09-24 06:53:51', '2025-09-24 06:53:51');
INSERT INTO `tbl_item_details` VALUES (60, 16, 1, '21/25', '15', '150.00', '20', '3000.00', '2025-09-24 06:53:51', '2025-09-24 06:53:51');
INSERT INTO `tbl_item_details` VALUES (63, 22, 10, '13/15', '1', '24.00', '10', '240.00', '2025-10-07 06:01:45', '2025-10-07 06:01:45');
INSERT INTO `tbl_item_details` VALUES (64, 22, 9, '8/12', '2', '48.00', '10', '480.00', '2025-10-07 06:01:45', '2025-10-07 06:01:45');
INSERT INTO `tbl_item_details` VALUES (65, 22, 8, 'U/7', '3', '72.00', '10', '720.00', '2025-10-07 06:01:45', '2025-10-07 06:01:45');
INSERT INTO `tbl_item_details` VALUES (66, 22, 2, '21/25', '5', '120.00', '10', '1200.00', '2025-10-07 06:01:45', '2025-10-07 06:01:45');
INSERT INTO `tbl_item_details` VALUES (67, 22, 5, '16/20', '4', '96.00', '10', '960.00', '2025-10-07 06:01:45', '2025-10-07 06:01:45');
INSERT INTO `tbl_item_details` VALUES (68, 21, 22, '61UP', '10', '100.00', '4000', '400000.00', '2025-10-07 06:14:51', '2025-10-07 06:14:51');
INSERT INTO `tbl_item_details` VALUES (69, 21, 21, '41/60', '20', '200.00', '40', '8000.00', '2025-10-07 06:14:51', '2025-10-07 06:14:51');
INSERT INTO `tbl_item_details` VALUES (72, 24, 4, '31/40', '10', '100.00', '20', '2000.00', '2025-10-07 07:48:28', '2025-10-07 07:48:28');
INSERT INTO `tbl_item_details` VALUES (73, 24, 3, '26/30', '10', '100.00', '10', '1000.00', '2025-10-07 07:48:28', '2025-10-07 07:48:28');
INSERT INTO `tbl_item_details` VALUES (74, 24, 1, '21/25', '10', '100.00', '15', '1500.00', '2025-10-07 07:48:28', '2025-10-07 07:48:28');
INSERT INTO `tbl_item_details` VALUES (75, 25, 22, '61UP', '2', '24.00', '25', '600.00', '2025-10-07 07:48:58', '2025-10-07 07:48:58');
INSERT INTO `tbl_item_details` VALUES (76, 25, 21, '41/60', '9', '108.00', '36', '3888.00', '2025-10-07 07:48:58', '2025-10-07 07:48:58');
INSERT INTO `tbl_item_details` VALUES (148, 48, 24, '21/25', '12', '144.00', '12', '1728.00', '2025-10-09 01:24:37', '2025-10-09 01:24:37');
INSERT INTO `tbl_item_details` VALUES (149, 48, 23, '16/20', '12', '144.00', '12', '1728.00', '2025-10-09 01:24:37', '2025-10-09 01:24:37');
INSERT INTO `tbl_item_details` VALUES (150, 49, 27, '700/900', '5', '25.00', '5', '125.00', '2025-10-09 01:25:03', '2025-10-09 01:25:03');
INSERT INTO `tbl_item_details` VALUES (151, 49, 26, '900/1000', '5', '25.00', '5', '125.00', '2025-10-09 01:25:03', '2025-10-09 01:25:03');
INSERT INTO `tbl_item_details` VALUES (152, 49, 25, '1000/UP', '5', '25.00', '5', '125.00', '2025-10-09 01:25:03', '2025-10-09 01:25:03');
INSERT INTO `tbl_item_details` VALUES (155, 26, 24, '21/25', '15', '150.00', '15', '2250.00', '2025-10-09 01:39:28', '2025-10-09 01:39:28');
INSERT INTO `tbl_item_details` VALUES (156, 26, 23, '16/20', '15', '150.00', '15', '2250.00', '2025-10-09 01:39:28', '2025-10-09 01:39:28');

-- ----------------------------
-- Table structure for tbl_items
-- ----------------------------
DROP TABLE IF EXISTS `tbl_items`;
CREATE TABLE `tbl_items`  (
  `ItemId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NULL DEFAULT NULL,
  `marksNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `PRFId` int NULL DEFAULT NULL,
  `PRSId` int NULL DEFAULT NULL,
  `PRSTId` int NULL DEFAULT NULL,
  `PRSPId` int NULL DEFAULT NULL,
  `PRSVId` int NULL DEFAULT NULL,
  `PRSPSId` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ItemId`) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  INDEX `PRFId`(`PRFId` ASC) USING BTREE,
  INDEX `PRSId`(`PRSId` ASC) USING BTREE,
  INDEX `PRSTId`(`PRSTId` ASC) USING BTREE,
  INDEX `PRSPId`(`PRSPId` ASC) USING BTREE,
  INDEX `PRSVId`(`PRSVId` ASC) USING BTREE,
  INDEX `PRSPSId`(`PRSPSId` ASC) USING BTREE,
  CONSTRAINT `tbl_items_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_items_ibfk_2` FOREIGN KEY (`PRFId`) REFERENCES `tbl_prf` (`PRFId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_items_ibfk_3` FOREIGN KEY (`PRSId`) REFERENCES `tbl_prs` (`PRSId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_items_ibfk_4` FOREIGN KEY (`PRSTId`) REFERENCES `tbl_prst` (`PRSTId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_items_ibfk_5` FOREIGN KEY (`PRSPId`) REFERENCES `tbl_prsp` (`PRSPId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_items_ibfk_6` FOREIGN KEY (`PRSVId`) REFERENCES `tbl_prsv` (`PRSVId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_items_ibfk_7` FOREIGN KEY (`PRSPSId`) REFERENCES `tbl_prsps` (`PRSPSId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_items
-- ----------------------------
INSERT INTO `tbl_items` VALUES (1, 8, 'marks1', 4, 19, 11, 7, 13, 16, '2025-09-08 22:03:18', '2025-09-09 07:29:10');
INSERT INTO `tbl_items` VALUES (2, 8, 'marks3', 7, 21, 19, 8, 6, 11, '2025-09-09 01:45:22', '2025-09-09 01:45:22');
INSERT INTO `tbl_items` VALUES (3, 8, 'marks3', 11, 23, 25, 2, 8, 15, '2025-09-09 05:25:01', '2025-09-09 05:25:15');
INSERT INTO `tbl_items` VALUES (8, 8, 'marks1', 7, 21, 17, 10, 4, 14, '2025-09-10 04:57:53', '2025-09-10 04:58:06');
INSERT INTO `tbl_items` VALUES (9, 9, 'marks1', 4, 19, 25, 1, 9, 16, '2025-09-10 06:56:10', '2025-09-10 06:57:31');
INSERT INTO `tbl_items` VALUES (10, 9, 'marks2', 4, 20, 18, 9, 4, 14, '2025-09-10 06:58:15', '2025-09-10 06:58:29');
INSERT INTO `tbl_items` VALUES (11, 11, 'marks1', 11, 23, 20, 7, 12, 16, '2025-09-10 19:03:09', '2025-09-10 19:03:09');
INSERT INTO `tbl_items` VALUES (12, 11, 'marks109', 7, 21, 20, 6, 5, 13, '2025-09-10 20:00:15', '2025-09-10 20:00:15');
INSERT INTO `tbl_items` VALUES (13, 12, '1500MCS', 3, 15, 25, 2, 12, 16, '2025-09-11 01:40:41', '2025-09-11 01:40:41');
INSERT INTO `tbl_items` VALUES (14, 12, 'marksno3', 1, 12, 24, 6, 6, 15, '2025-09-11 01:45:03', '2025-09-11 01:45:03');
INSERT INTO `tbl_items` VALUES (15, 13, '1500 MCS ', 7, 21, 24, 4, 11, 15, '2025-09-11 06:09:19', '2025-09-11 06:09:19');
INSERT INTO `tbl_items` VALUES (16, 13, '2500 MCS', 1, 22, 1, 12, 12, 3, '2025-09-24 06:53:51', '2025-09-24 06:53:51');
INSERT INTO `tbl_items` VALUES (21, 14, 'ABC-123', 11, 23, 18, 8, 5, 13, '2025-10-07 04:54:37', '2025-10-07 06:14:51');
INSERT INTO `tbl_items` VALUES (22, 14, 'ROUTETEST', 11, 23, 17, 9, 4, 2, '2025-10-07 06:01:45', '2025-10-07 06:01:45');
INSERT INTO `tbl_items` VALUES (24, 15, 'TEST MARKS', 7, 21, 12, 6, 8, 3, '2025-10-07 07:48:28', '2025-10-07 07:48:28');
INSERT INTO `tbl_items` VALUES (25, 15, '16116', 11, 23, 18, 3, 8, 13, '2025-10-07 07:48:58', '2025-10-07 07:48:58');
INSERT INTO `tbl_items` VALUES (26, 16, 'MARKS 1200', 11, 23, 18, 8, 6, 15, '2025-10-07 07:53:42', '2025-10-09 01:39:28');
INSERT INTO `tbl_items` VALUES (48, 16, 'asdf', 11, 23, 18, 5, 6, 15, '2025-10-09 01:24:37', '2025-10-09 01:24:37');
INSERT INTO `tbl_items` VALUES (49, 16, 'asdf', 4, 19, 16, 7, 5, 16, '2025-10-09 01:25:03', '2025-10-09 01:25:03');

-- ----------------------------
-- Table structure for tbl_pi
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pi`;
CREATE TABLE `tbl_pi`  (
  `PIId` int NOT NULL AUTO_INCREMENT,
  `PINo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PIDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `GSTIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PONumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `netQuantity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `grossQuantity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `shipDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `exporterId` int NULL DEFAULT NULL,
  `processorId` int NULL DEFAULT NULL,
  `consigneeId` int NULL DEFAULT NULL,
  `bankId` int NULL DEFAULT NULL,
  `TDP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `loadingPortId` int NULL DEFAULT NULL,
  `dischargePortId` int NULL DEFAULT NULL,
  `containerNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `linerNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `POQuality` int NULL DEFAULT NULL,
  PRIMARY KEY (`PIId`) USING BTREE,
  UNIQUE INDEX `PINo`(`PINo` ASC) USING BTREE,
  INDEX `exporterId`(`exporterId` ASC) USING BTREE,
  INDEX `processorId`(`processorId` ASC) USING BTREE,
  INDEX `consigneeId`(`consigneeId` ASC) USING BTREE,
  INDEX `bankId`(`bankId` ASC) USING BTREE,
  INDEX `loadingPortId`(`loadingPortId` ASC) USING BTREE,
  INDEX `dischargePortId`(`dischargePortId` ASC) USING BTREE,
  CONSTRAINT `tbl_pi_ibfk_1` FOREIGN KEY (`exporterId`) REFERENCES `tbl_companies` (`companyId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tbl_pi_ibfk_2` FOREIGN KEY (`processorId`) REFERENCES `tbl_companies` (`companyId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tbl_pi_ibfk_3` FOREIGN KEY (`consigneeId`) REFERENCES `tbl_companies` (`companyId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tbl_pi_ibfk_4` FOREIGN KEY (`bankId`) REFERENCES `tbl_banks` (`bankId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_pi_ibfk_5` FOREIGN KEY (`loadingPortId`) REFERENCES `tbl_ports` (`portId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tbl_pi_ibfk_6` FOREIGN KEY (`dischargePortId`) REFERENCES `tbl_ports` (`portId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_pi
-- ----------------------------
INSERT INTO `tbl_pi` VALUES (8, 'DPL001', '2025-09-01', 'gdt', 'PO001', NULL, NULL, '2025-09-27', 7, 6, 9, 4, 'tdf', 5, 3, NULL, NULL, '2025-09-08 22:02:32', '2025-09-09 06:42:28', NULL);
INSERT INTO `tbl_pi` VALUES (9, 'MLMS001', '2025-09-09', 'gst', 'PO003', NULL, NULL, '2025-09-30T06:54:00.000Z', 4, 6, 8, 1, 'tdp', 10, 14, NULL, NULL, '2025-09-10 06:55:21', '2025-09-10 06:55:21', NULL);
INSERT INTO `tbl_pi` VALUES (10, 'SML002', '2025-09-11', 'asdf', 'PO004', NULL, NULL, '2025-09-23T08:49:00.000Z', 12, 2, 9, 1, 'td', 5, 4, NULL, NULL, '2025-09-10 08:49:38', '2025-09-10 08:49:38', NULL);
INSERT INTO `tbl_pi` VALUES (11, 'SML0019', '2025-09-09', 'asdf', 'asdf', NULL, NULL, '2025-09-15T08:52:00.000Z', 12, 2, 9, 2, 'sdf', 6, 5, NULL, NULL, '2025-09-10 08:59:21', '2025-09-10 09:00:07', NULL);
INSERT INTO `tbl_pi` VALUES (12, 'SAS0092', '2025-09-09', 'asdf', 'PO9912', NULL, NULL, '2025-09-23T01:39:00.000Z', 5, 6, 13, 1, 'TDP', 8, 11, NULL, NULL, '2025-09-11 01:39:38', '2025-09-11 01:39:38', 123);
INSERT INTO `tbl_pi` VALUES (13, 'SMLW-002', '2025-09-10', '37AAHCG5707G1ZK', 'WPE-002', NULL, NULL, '2025-09-23', 7, 6, 13, 3, '100% LC at sight, CNF, JAPAN', 10, 12, NULL, NULL, '2025-09-11 06:08:42', '2025-09-11 06:08:42', 123);
INSERT INTO `tbl_pi` VALUES (14, 'PI-0234A12', '2025-10-06', 'GST120987', 'PO-B71N7789', NULL, NULL, '2025-10-08', 12, 2, 16, 4, 'Please refer to Terms and Conditions given...', 4, 14, NULL, NULL, '2025-10-06 14:31:36', '2025-10-06 14:31:36', 1500);
INSERT INTO `tbl_pi` VALUES (15, 'Asd4556', '2025-10-07', '2345687667', '4555666', NULL, NULL, '2025-10-09', 12, 2, 13, 3, 'Drkdkdjdn', 14, 8, NULL, NULL, '2025-10-07 07:43:02', '2025-10-07 07:43:02', 120);
INSERT INTO `tbl_pi` VALUES (16, 'MAK-001', '2025-10-08', 'GSTIn', 'PO-0001', NULL, NULL, '2025-10-14', 12, 2, 8, 4, 'TDP', 6, 11, NULL, NULL, '2025-10-07 07:52:46', '2025-10-07 07:52:46', 120);

-- ----------------------------
-- Table structure for tbl_ports
-- ----------------------------
DROP TABLE IF EXISTS `tbl_ports`;
CREATE TABLE `tbl_ports`  (
  `portId` int NOT NULL AUTO_INCREMENT,
  `portName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`portId`) USING BTREE,
  UNIQUE INDEX `portName`(`portName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_ports
-- ----------------------------
INSERT INTO `tbl_ports` VALUES (1, 'Kolkata', 'India', '2024-11-20 07:31:02', '2024-11-20 07:31:02');
INSERT INTO `tbl_ports` VALUES (2, 'Sapporo', 'Japan', '2024-11-20 07:31:13', '2024-11-20 07:31:13');
INSERT INTO `tbl_ports` VALUES (3, 'Zhanjiang', 'China', '2025-07-03 06:10:41', '2025-07-03 06:10:41');
INSERT INTO `tbl_ports` VALUES (4, 'Chennai ', 'India ', '2025-07-03 06:25:08', '2025-07-03 06:25:08');
INSERT INTO `tbl_ports` VALUES (5, 'Kattupalli', 'India', '2025-07-03 07:13:52', '2025-07-03 07:13:52');
INSERT INTO `tbl_ports` VALUES (6, 'Osaka', 'Japan ', '2025-07-03 11:15:17', '2025-07-03 11:15:17');
INSERT INTO `tbl_ports` VALUES (7, 'BUSAN ', 'SOUTU KOREA ', '2025-07-03 11:41:49', '2025-07-03 11:41:49');
INSERT INTO `tbl_ports` VALUES (8, 'Venice', 'Italy ', '2025-07-03 11:45:29', '2025-07-03 11:45:29');
INSERT INTO `tbl_ports` VALUES (9, 'Ennore', 'India', '2025-07-03 11:45:58', '2025-07-03 11:45:58');
INSERT INTO `tbl_ports` VALUES (10, 'Haiphong', 'Vietnam ', '2025-07-05 05:00:55', '2025-07-05 05:00:55');
INSERT INTO `tbl_ports` VALUES (11, 'Xiamen', 'China', '2025-07-05 05:03:35', '2025-07-05 05:03:35');
INSERT INTO `tbl_ports` VALUES (12, 'Cat Lai Hochin Minh city', 'Vietnam ', '2025-07-05 05:04:55', '2025-07-05 05:04:55');
INSERT INTO `tbl_ports` VALUES (13, 'Penang', 'Malaysia ', '2025-07-05 05:05:32', '2025-07-05 05:05:32');
INSERT INTO `tbl_ports` VALUES (14, 'Vancouver ', 'Canada ', '2025-07-07 12:58:19', '2025-07-07 12:58:19');

-- ----------------------------
-- Table structure for tbl_prf
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prf`;
CREATE TABLE `tbl_prf`  (
  `PRFId` int NOT NULL AUTO_INCREMENT,
  `PRFName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `HSN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRFId`) USING BTREE,
  UNIQUE INDEX `PRFName`(`PRFName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prf
-- ----------------------------
INSERT INTO `tbl_prf` VALUES (1, 'Shrimp', '30618', '2025-06-30 14:13:19', '2025-07-05 10:17:20');
INSERT INTO `tbl_prf` VALUES (2, 'Crustacean ', '030617', '2025-07-03 06:11:36', '2025-07-03 06:11:36');
INSERT INTO `tbl_prf` VALUES (3, 'Squid ', '030743', '2025-07-03 07:36:59', '2025-07-03 07:36:59');
INSERT INTO `tbl_prf` VALUES (4, 'Cuttlefish ', '030743', '2025-07-03 07:37:14', '2025-07-05 07:22:51');
INSERT INTO `tbl_prf` VALUES (5, 'Octopus ', '030743', '2025-07-03 07:37:34', '2025-07-03 07:37:34');
INSERT INTO `tbl_prf` VALUES (6, 'Lobster ', '030619', '2025-07-03 07:57:59', '2025-07-05 07:21:49');
INSERT INTO `tbl_prf` VALUES (7, 'Cephalopods ', '030743', '2025-07-05 07:20:45', '2025-07-05 07:22:47');
INSERT INTO `tbl_prf` VALUES (11, 'Fish', '030359', '2025-07-07 12:59:34', '2025-07-07 12:59:34');

-- ----------------------------
-- Table structure for tbl_prs
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prs`;
CREATE TABLE `tbl_prs`  (
  `PRSId` int NOT NULL AUTO_INCREMENT,
  `PRFId` int NULL DEFAULT NULL,
  `PRSName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `scientificName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSId`) USING BTREE,
  UNIQUE INDEX `PRSName`(`PRSName` ASC) USING BTREE,
  INDEX `PRFId`(`PRFId` ASC) USING BTREE,
  CONSTRAINT `tbl_prs_ibfk_1` FOREIGN KEY (`PRFId`) REFERENCES `tbl_prf` (`PRFId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prs
-- ----------------------------
INSERT INTO `tbl_prs` VALUES (12, 1, 'Penaeus monodon', 'Penaeus monodon', '2025-07-03 07:50:19', '2025-07-03 12:04:12');
INSERT INTO `tbl_prs` VALUES (13, 1, 'Macrobrachium rosenbergii', 'Macrobrachium rosenbergii', '2025-07-03 07:51:42', '2025-07-03 12:03:58');
INSERT INTO `tbl_prs` VALUES (14, 6, 'Thenus orientalis', 'Thenus orientalis', '2025-07-03 07:58:51', '2025-07-03 12:03:18');
INSERT INTO `tbl_prs` VALUES (15, 3, 'Uroteuthis duvauceli ', 'Uroteuthis duvauceli', '2025-07-03 08:03:06', '2025-07-03 12:03:04');
INSERT INTO `tbl_prs` VALUES (18, 3, 'Loligo duvauceli', 'Loligo duvauceli ', '2025-07-03 08:05:21', '2025-07-03 12:02:37');
INSERT INTO `tbl_prs` VALUES (19, 4, 'Sepia pharaonis', 'Sepia pharaonis', '2025-07-03 08:06:33', '2025-07-03 12:01:57');
INSERT INTO `tbl_prs` VALUES (20, 4, 'Sepia officinalis', 'Sepia officinalis', '2025-07-03 08:07:53', '2025-07-03 12:02:25');
INSERT INTO `tbl_prs` VALUES (21, 7, 'Octopus ', 'Octopus vulgaris', '2025-07-03 08:08:33', '2025-07-05 07:41:30');
INSERT INTO `tbl_prs` VALUES (22, 1, 'Vannamei ', 'Litopenaeus Vannamei ', '2025-07-05 10:17:54', '2025-07-05 10:17:54');
INSERT INTO `tbl_prs` VALUES (23, 11, 'Indian mackerel ', 'rastrelliger kanagurta', '2025-07-07 13:00:41', '2025-07-07 13:00:41');

-- ----------------------------
-- Table structure for tbl_prsg
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prsg`;
CREATE TABLE `tbl_prsg`  (
  `PRSGId` int NOT NULL AUTO_INCREMENT,
  `PRSPSId` int NULL DEFAULT NULL,
  `PRSGDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSGId`) USING BTREE,
  INDEX `PRSPSId`(`PRSPSId` ASC) USING BTREE,
  CONSTRAINT `tbl_prsg_ibfk_1` FOREIGN KEY (`PRSPSId`) REFERENCES `tbl_prsps` (`PRSPSId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prsg
-- ----------------------------
INSERT INTO `tbl_prsg` VALUES (1, 3, '21/25', '2025-06-30 14:16:52', '2025-06-30 14:30:05');
INSERT INTO `tbl_prsg` VALUES (2, 2, '21/25', '2025-06-30 14:17:02', '2025-06-30 14:30:49');
INSERT INTO `tbl_prsg` VALUES (3, 3, '26/30', '2025-06-30 14:30:17', '2025-06-30 14:30:17');
INSERT INTO `tbl_prsg` VALUES (4, 3, '31/40', '2025-06-30 14:30:33', '2025-06-30 14:30:33');
INSERT INTO `tbl_prsg` VALUES (5, 2, '16/20', '2025-07-03 06:17:10', '2025-07-03 06:17:10');
INSERT INTO `tbl_prsg` VALUES (6, 9, 'U/3', '2025-07-03 11:17:55', '2025-07-03 12:19:07');
INSERT INTO `tbl_prsg` VALUES (7, 9, 'U/5', '2025-07-03 11:18:25', '2025-07-03 12:18:58');
INSERT INTO `tbl_prsg` VALUES (8, 2, 'U/7', '2025-07-03 11:18:55', '2025-07-03 11:18:55');
INSERT INTO `tbl_prsg` VALUES (9, 2, '8/12', '2025-07-03 11:19:14', '2025-07-03 11:19:14');
INSERT INTO `tbl_prsg` VALUES (10, 2, '13/15', '2025-07-03 11:19:36', '2025-07-03 11:19:36');
INSERT INTO `tbl_prsg` VALUES (11, 9, '10/20', '2025-07-03 12:19:31', '2025-07-03 12:19:31');
INSERT INTO `tbl_prsg` VALUES (12, 9, '20/30', '2025-07-03 12:19:44', '2025-07-03 12:19:44');
INSERT INTO `tbl_prsg` VALUES (13, 10, 'Assorted ', '2025-07-03 12:20:10', '2025-07-03 12:20:10');
INSERT INTO `tbl_prsg` VALUES (14, 14, '250/300', '2025-07-03 12:21:30', '2025-07-03 12:21:30');
INSERT INTO `tbl_prsg` VALUES (15, 14, '300/UP', '2025-07-03 12:21:45', '2025-07-03 12:21:45');
INSERT INTO `tbl_prsg` VALUES (16, 9, 'U/1', '2025-07-05 05:38:24', '2025-07-05 05:38:24');
INSERT INTO `tbl_prsg` VALUES (17, 9, '1/2', '2025-07-05 05:38:48', '2025-07-05 05:38:48');
INSERT INTO `tbl_prsg` VALUES (18, 14, 'All sizes ', '2025-07-05 05:39:22', '2025-07-05 05:39:22');
INSERT INTO `tbl_prsg` VALUES (19, 11, '41/60', '2025-07-05 05:39:48', '2025-07-05 05:39:48');
INSERT INTO `tbl_prsg` VALUES (20, 11, '61UP', '2025-07-05 05:40:08', '2025-07-05 05:40:08');
INSERT INTO `tbl_prsg` VALUES (21, 13, '41/60', '2025-07-05 05:40:36', '2025-07-05 05:40:36');
INSERT INTO `tbl_prsg` VALUES (22, 13, '61UP', '2025-07-05 05:40:56', '2025-07-05 05:40:56');
INSERT INTO `tbl_prsg` VALUES (23, 15, '16/20', '2025-07-05 10:21:48', '2025-07-05 10:21:48');
INSERT INTO `tbl_prsg` VALUES (24, 15, '21/25', '2025-07-05 10:22:00', '2025-07-05 10:22:00');
INSERT INTO `tbl_prsg` VALUES (25, 16, '1000/UP', '2025-07-07 13:11:21', '2025-07-07 13:11:21');
INSERT INTO `tbl_prsg` VALUES (26, 16, '900/1000', '2025-07-07 13:11:36', '2025-07-07 13:11:36');
INSERT INTO `tbl_prsg` VALUES (27, 16, '700/900', '2025-07-07 13:11:50', '2025-07-07 13:11:50');

-- ----------------------------
-- Table structure for tbl_prsp
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prsp`;
CREATE TABLE `tbl_prsp`  (
  `PRSPId` int NOT NULL AUTO_INCREMENT,
  `PRSPPiece` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PRSPWeight` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PRSPWId` int NULL DEFAULT NULL,
  `PRSPWSId` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPId`) USING BTREE,
  INDEX `PRSPWId`(`PRSPWId` ASC) USING BTREE,
  INDEX `PRSPWSId`(`PRSPWSId` ASC) USING BTREE,
  CONSTRAINT `tbl_prsp_ibfk_1` FOREIGN KEY (`PRSPWId`) REFERENCES `tbl_prspw` (`PRSPWId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_prsp_ibfk_2` FOREIGN KEY (`PRSPWSId`) REFERENCES `tbl_prspws` (`PRSPWSId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prsp
-- ----------------------------
INSERT INTO `tbl_prsp` VALUES (1, '6', '1.8', 1, 8, '2025-06-30 14:17:53', '2025-07-21 08:11:58');
INSERT INTO `tbl_prsp` VALUES (2, '5', '10', 2, 2, '2025-06-30 14:18:10', '2025-06-30 14:18:10');
INSERT INTO `tbl_prsp` VALUES (3, '6', '2', 1, 1, '2025-07-03 06:19:50', '2025-07-03 06:20:13');
INSERT INTO `tbl_prsp` VALUES (4, '1', '10', 1, 4, '2025-07-03 12:14:02', '2025-07-03 12:14:02');
INSERT INTO `tbl_prsp` VALUES (5, '6', '2', 1, 12, '2025-07-03 12:14:22', '2025-07-03 12:14:22');
INSERT INTO `tbl_prsp` VALUES (6, '1', '10', 1, 11, '2025-07-03 12:14:50', '2025-07-03 12:14:50');
INSERT INTO `tbl_prsp` VALUES (7, '1', '5', 1, 7, '2025-07-03 12:15:16', '2025-07-03 12:15:16');
INSERT INTO `tbl_prsp` VALUES (8, '1', '10', 1, 7, '2025-07-05 07:37:40', '2025-07-05 07:37:40');
INSERT INTO `tbl_prsp` VALUES (9, '6', '4', 2, 9, '2025-07-05 09:26:47', '2025-07-05 09:26:47');
INSERT INTO `tbl_prsp` VALUES (10, '1', '2', 2, 15, '2025-07-05 10:11:47', '2025-07-05 10:11:47');
INSERT INTO `tbl_prsp` VALUES (11, '6', '2', 1, 15, '2025-07-05 10:19:45', '2025-07-05 10:19:45');
INSERT INTO `tbl_prsp` VALUES (12, '1', '10', 1, 16, '2025-07-07 13:12:30', '2025-07-07 13:12:30');
INSERT INTO `tbl_prsp` VALUES (13, '6', '1.5', 1, 15, '2025-07-21 08:18:28', '2025-07-21 08:18:28');

-- ----------------------------
-- Table structure for tbl_prsps
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prsps`;
CREATE TABLE `tbl_prsps`  (
  `PRSPSId` int NOT NULL AUTO_INCREMENT,
  `PRSPSDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPSId`) USING BTREE,
  UNIQUE INDEX `PRSPSDesc`(`PRSPSDesc` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prsps
-- ----------------------------
INSERT INTO `tbl_prsps` VALUES (1, 'HON', '2025-06-30 14:16:06', '2025-06-30 14:16:06');
INSERT INTO `tbl_prsps` VALUES (2, 'HLS', '2025-06-30 14:16:11', '2025-07-21 08:11:10');
INSERT INTO `tbl_prsps` VALUES (3, 'PD', '2025-06-30 14:16:19', '2025-06-30 14:16:19');
INSERT INTO `tbl_prsps` VALUES (4, 'PUD', '2025-07-03 08:26:53', '2025-07-03 08:26:53');
INSERT INTO `tbl_prsps` VALUES (5, 'PVPD ', '2025-07-03 08:27:13', '2025-07-03 08:27:13');
INSERT INTO `tbl_prsps` VALUES (6, 'Squid whole ', '2025-07-03 11:21:08', '2025-07-03 11:21:08');
INSERT INTO `tbl_prsps` VALUES (7, 'Cuttlefish whole ', '2025-07-03 11:21:21', '2025-07-03 11:21:21');
INSERT INTO `tbl_prsps` VALUES (8, 'Squid whole cleaned ', '2025-07-03 11:21:38', '2025-07-03 11:21:38');
INSERT INTO `tbl_prsps` VALUES (9, 'Cuttlefish whole cleaned ', '2025-07-03 11:21:52', '2025-07-03 11:21:52');
INSERT INTO `tbl_prsps` VALUES (10, 'Cuttlefish Roe', '2025-07-03 11:22:07', '2025-07-03 11:22:07');
INSERT INTO `tbl_prsps` VALUES (11, 'Squid tentacles ', '2025-07-03 11:22:28', '2025-07-03 11:22:28');
INSERT INTO `tbl_prsps` VALUES (12, 'Cuttlefish tentacles ', '2025-07-03 11:22:46', '2025-07-03 11:22:46');
INSERT INTO `tbl_prsps` VALUES (13, 'Squid tube ', '2025-07-03 11:23:03', '2025-07-03 11:23:03');
INSERT INTO `tbl_prsps` VALUES (14, 'Sand Lobster whole ', '2025-07-03 12:21:00', '2025-07-03 12:21:00');
INSERT INTO `tbl_prsps` VALUES (15, 'IQF', '2025-07-05 10:13:24', '2025-07-05 10:13:24');
INSERT INTO `tbl_prsps` VALUES (16, 'IF', '2025-07-07 13:10:45', '2025-07-07 13:10:45');

-- ----------------------------
-- Table structure for tbl_prspw
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prspw`;
CREATE TABLE `tbl_prspw`  (
  `PRSPWId` int NOT NULL AUTO_INCREMENT,
  `PRSPWUnit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPWId`) USING BTREE,
  UNIQUE INDEX `PRSPWUnit`(`PRSPWUnit` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prspw
-- ----------------------------
INSERT INTO `tbl_prspw` VALUES (1, 'Kgs', '2025-06-30 14:14:19', '2025-06-30 14:14:19');
INSERT INTO `tbl_prspw` VALUES (2, 'lbs', '2025-06-30 14:14:29', '2025-06-30 14:14:29');

-- ----------------------------
-- Table structure for tbl_prspws
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prspws`;
CREATE TABLE `tbl_prspws`  (
  `PRSPWSId` int NOT NULL AUTO_INCREMENT,
  `PRSPWSStyle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPWSId`) USING BTREE,
  UNIQUE INDEX `PRSPWSStyle`(`PRSPWSStyle` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prspws
-- ----------------------------
INSERT INTO `tbl_prspws` VALUES (1, 'net weight/net count', '2025-06-30 14:15:04', '2025-06-30 14:15:04');
INSERT INTO `tbl_prspws` VALUES (2, '5%  Glaze net weight/ net count ', '2025-06-30 14:15:12', '2025-07-03 08:21:02');
INSERT INTO `tbl_prspws` VALUES (3, ' 20% glaze with frozen weight/ frozen count', '2025-06-30 14:15:20', '2025-07-03 08:20:14');
INSERT INTO `tbl_prspws` VALUES (4, '10% glaze with netweight/net count', '2025-06-30 14:15:27', '2025-07-03 08:19:37');
INSERT INTO `tbl_prspws` VALUES (5, '25% frozen weight/frozen count ', '2025-07-03 08:21:35', '2025-07-03 08:21:35');
INSERT INTO `tbl_prspws` VALUES (6, '6×2 kg', '2025-07-03 08:22:00', '2025-07-03 08:22:00');
INSERT INTO `tbl_prspws` VALUES (7, '1×5 kg with 20% glaze ', '2025-07-03 08:22:37', '2025-07-03 08:22:37');
INSERT INTO `tbl_prspws` VALUES (8, '6×1.8 kg', '2025-07-03 08:22:52', '2025-07-21 08:11:30');
INSERT INTO `tbl_prspws` VALUES (9, '6× 4 lbs', '2025-07-03 08:23:06', '2025-07-03 08:23:06');
INSERT INTO `tbl_prspws` VALUES (10, '1×10kg with 10% glaze ', '2025-07-03 08:23:31', '2025-07-03 08:23:31');
INSERT INTO `tbl_prspws` VALUES (11, '1× 10 kg with 20 % glaze ', '2025-07-03 08:23:57', '2025-07-03 08:23:57');
INSERT INTO `tbl_prspws` VALUES (12, '6× 2 kg with 20% glaze ', '2025-07-03 08:24:17', '2025-07-03 08:24:17');
INSERT INTO `tbl_prspws` VALUES (13, '10 Kg bulk', '2025-07-05 05:34:09', '2025-07-05 05:34:09');
INSERT INTO `tbl_prspws` VALUES (14, '5 Kg Bulk', '2025-07-05 05:34:38', '2025-07-05 05:34:38');
INSERT INTO `tbl_prspws` VALUES (15, 'IQF', '2025-07-05 10:10:52', '2025-07-05 10:10:52');
INSERT INTO `tbl_prspws` VALUES (16, '1×10 ', '2025-07-07 13:02:21', '2025-07-07 13:02:21');

-- ----------------------------
-- Table structure for tbl_prst
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prst`;
CREATE TABLE `tbl_prst`  (
  `PRSTId` int NOT NULL AUTO_INCREMENT,
  `PRSTName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSTId`) USING BTREE,
  UNIQUE INDEX `PRSTName`(`PRSTName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prst
-- ----------------------------
INSERT INTO `tbl_prst` VALUES (1, 'Frozen Head on shel on', '2025-06-30 14:13:59', '2025-06-30 14:13:59');
INSERT INTO `tbl_prst` VALUES (2, 'Raw Frozen Headless Shell on ', '2025-07-03 06:15:00', '2025-07-03 06:15:00');
INSERT INTO `tbl_prst` VALUES (3, 'Frozen Raw head less shell on ', '2025-07-03 08:09:30', '2025-07-03 08:09:30');
INSERT INTO `tbl_prst` VALUES (4, 'Raw frozen peeled and deveined ', '2025-07-03 08:10:00', '2025-07-03 08:10:00');
INSERT INTO `tbl_prst` VALUES (5, 'Raw frozen peeled and undevined', '2025-07-03 08:10:36', '2025-07-03 08:10:36');
INSERT INTO `tbl_prst` VALUES (6, 'Raw frozen head less shell on pulled veined', '2025-07-03 08:11:23', '2025-07-03 08:11:23');
INSERT INTO `tbl_prst` VALUES (7, 'Raw frozen peeled and pulled veined ', '2025-07-03 08:11:44', '2025-07-03 08:11:44');
INSERT INTO `tbl_prst` VALUES (8, 'Raw frozen Squid whole ', '2025-07-03 08:12:51', '2025-07-03 08:12:51');
INSERT INTO `tbl_prst` VALUES (9, 'Raw frozen squid whole cleaned', '2025-07-03 08:13:16', '2025-07-03 08:13:16');
INSERT INTO `tbl_prst` VALUES (10, 'Raw frozen  squid ring ', '2025-07-03 08:13:31', '2025-07-03 08:13:31');
INSERT INTO `tbl_prst` VALUES (11, 'Raw frozen  squid tentacles ', '2025-07-03 08:13:50', '2025-07-03 08:13:50');
INSERT INTO `tbl_prst` VALUES (12, 'Raw frozen squid fillets', '2025-07-03 08:14:07', '2025-07-03 08:14:07');
INSERT INTO `tbl_prst` VALUES (13, 'Raw frozen  Squid Tubes', '2025-07-03 08:14:34', '2025-07-03 08:14:34');
INSERT INTO `tbl_prst` VALUES (15, 'Raw frozen cuttlefish whole ', '2025-07-03 08:15:14', '2025-07-03 08:15:14');
INSERT INTO `tbl_prst` VALUES (16, 'Raw frozen cuttlefish whole cleaned ', '2025-07-03 08:15:31', '2025-07-03 08:15:31');
INSERT INTO `tbl_prst` VALUES (17, 'Raw frozen cuttlefish Roe', '2025-07-03 08:15:52', '2025-07-03 08:15:52');
INSERT INTO `tbl_prst` VALUES (18, 'Raw frozen cuttlefish fillets ', '2025-07-03 08:16:10', '2025-07-03 08:16:10');
INSERT INTO `tbl_prst` VALUES (19, 'Raw frozen cuttlefish tentacles ', '2025-07-03 08:16:40', '2025-07-03 08:16:40');
INSERT INTO `tbl_prst` VALUES (20, 'Raw frozen octopus whole', '2025-07-03 08:16:59', '2025-07-03 08:16:59');
INSERT INTO `tbl_prst` VALUES (21, 'Raw frozen octopus whole cleaned ', '2025-07-03 08:17:20', '2025-07-03 08:17:20');
INSERT INTO `tbl_prst` VALUES (22, 'Frozen cuttlefish whole cleaned- IF', '2025-07-05 05:30:35', '2025-07-05 05:30:35');
INSERT INTO `tbl_prst` VALUES (23, 'Sand Lobster-IF- IWP', '2025-07-05 05:31:52', '2025-07-05 05:31:52');
INSERT INTO `tbl_prst` VALUES (24, 'Frozen Squid Tubes ', '2025-07-05 05:32:26', '2025-07-05 05:32:26');
INSERT INTO `tbl_prst` VALUES (25, 'Frozen Raw Indian mackerel fish whole ', '2025-07-07 13:01:41', '2025-07-07 13:01:41');

-- ----------------------------
-- Table structure for tbl_prsv
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prsv`;
CREATE TABLE `tbl_prsv`  (
  `PRSVId` int NOT NULL AUTO_INCREMENT,
  `PRSVDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSVId`) USING BTREE,
  UNIQUE INDEX `PRSVDesc`(`PRSVDesc` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_prsv
-- ----------------------------
INSERT INTO `tbl_prsv` VALUES (1, 'Nobashi', '2025-06-30 14:15:44', '2025-06-30 14:15:44');
INSERT INTO `tbl_prsv` VALUES (2, 'Head less shell on ', '2025-07-03 06:16:29', '2025-07-03 06:16:29');
INSERT INTO `tbl_prsv` VALUES (3, 'Raw Frozen head on shell on ', '2025-07-03 08:25:45', '2025-07-03 08:25:45');
INSERT INTO `tbl_prsv` VALUES (4, 'Cuttlefish whole ', '2025-07-03 11:26:38', '2025-07-03 11:26:38');
INSERT INTO `tbl_prsv` VALUES (5, 'Cuttlefish whole cleaned ', '2025-07-03 11:26:54', '2025-07-03 11:26:54');
INSERT INTO `tbl_prsv` VALUES (6, 'Squid whole ', '2025-07-03 11:27:10', '2025-07-03 11:27:10');
INSERT INTO `tbl_prsv` VALUES (7, 'Squid whole cleaned ', '2025-07-03 11:27:23', '2025-07-03 11:27:23');
INSERT INTO `tbl_prsv` VALUES (8, 'Cuttlefish Roe ', '2025-07-03 11:27:45', '2025-07-03 11:27:45');
INSERT INTO `tbl_prsv` VALUES (9, 'Cuttlefish tentacles ', '2025-07-03 11:28:06', '2025-07-03 11:28:06');
INSERT INTO `tbl_prsv` VALUES (10, 'Squid tentacles ', '2025-07-03 11:28:36', '2025-07-03 11:28:36');
INSERT INTO `tbl_prsv` VALUES (11, 'Squid tubes ', '2025-07-03 11:28:52', '2025-07-03 11:28:52');
INSERT INTO `tbl_prsv` VALUES (12, 'Sand Lobster whole ', '2025-07-05 05:35:28', '2025-07-05 05:35:28');
INSERT INTO `tbl_prsv` VALUES (13, 'Indian mackerel fish whole ', '2025-07-07 13:10:26', '2025-07-07 13:10:26');

-- ----------------------------
-- Table structure for tbl_test
-- ----------------------------
DROP TABLE IF EXISTS `tbl_test`;
CREATE TABLE `tbl_test`  (
  `testId` int NOT NULL AUTO_INCREMENT,
  `testDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`testId`) USING BTREE,
  UNIQUE INDEX `testDesc`(`testDesc` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_test
-- ----------------------------
INSERT INTO `tbl_test` VALUES (1, 'CHLORAMP HINICOL', '2025-09-10 01:48:25', '2025-09-10 01:48:25');
INSERT INTO `tbl_test` VALUES (2, 'AOZ', '2025-09-10 01:48:32', '2025-09-10 01:48:32');
INSERT INTO `tbl_test` VALUES (3, 'AMOZ', '2025-09-10 01:48:39', '2025-09-10 01:48:39');
INSERT INTO `tbl_test` VALUES (4, 'AHD', '2025-09-10 01:48:45', '2025-09-10 01:48:45');
INSERT INTO `tbl_test` VALUES (5, 'SEM', '2025-09-10 01:48:52', '2025-09-10 01:48:52');

-- ----------------------------
-- Table structure for tbl_trace_ability
-- ----------------------------
DROP TABLE IF EXISTS `tbl_trace_ability`;
CREATE TABLE `tbl_trace_ability`  (
  `traceAbilityId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NULL DEFAULT NULL,
  `ItemId` int NOT NULL,
  `productDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rawMaterialQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `headlessQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usedCase` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ballanceCase` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `beforeDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`traceAbilityId`) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  CONSTRAINT `tbl_trace_ability_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_trace_ability
-- ----------------------------
INSERT INTO `tbl_trace_ability` VALUES (10, 8, 1, '2025-09-16T09:32:00.000Z', '1', '20', '3L04', '0', '10', '2', '2025-09-15', '2025-09-10 06:08:36', '2025-09-10 06:08:36');
INSERT INTO `tbl_trace_ability` VALUES (11, 8, 3, '2025-09-23T09:32:00.000Z', '20', '10', '3L04', '0', '230', '1', '2025-09-22', '2025-09-10 06:08:36', '2025-09-10 06:08:36');
INSERT INTO `tbl_trace_ability` VALUES (12, 8, 2, '2025-09-30T09:32:00.000Z', '2', '10', '3L05', '0', '4', '0', '2025-09-29', '2025-09-10 06:08:36', '2025-09-10 06:08:36');
INSERT INTO `tbl_trace_ability` VALUES (13, 9, 9, '2025-09-11T07:12:00.000Z', '1', '1', 'LOSA1', '16', '1', '1', '2025-09-10', '2025-09-10 07:12:40', '2025-09-10 07:12:40');
INSERT INTO `tbl_trace_ability` VALUES (14, 9, 9, '2025-09-19T07:12:00.000Z', '1', '110', 'LOSA1', '16', '10', '1', '2025-09-18', '2025-09-10 07:12:40', '2025-09-10 07:12:40');
INSERT INTO `tbl_trace_ability` VALUES (15, 9, 10, '2025-09-26T07:12:00.000Z', '1', '0', 'LOSA12', '22', '1', '1', '2025-09-25', '2025-09-10 07:12:40', '2025-09-10 07:12:40');
INSERT INTO `tbl_trace_ability` VALUES (16, 9, 10, '2025-09-30T07:12:00.000Z', '1', '1', 'LSO', '22', '11', '1', '2025-09-29', '2025-09-10 07:12:40', '2025-09-10 07:12:40');
INSERT INTO `tbl_trace_ability` VALUES (17, 11, 11, '2025-09-16T19:06:00.000Z', '10', '12', 'PSO', '25', '10', '1', '2025-09-15', '2025-09-10 19:07:11', '2025-09-10 19:07:11');
INSERT INTO `tbl_trace_ability` VALUES (19, 12, 13, '2025-09-09T01:42:00.000Z', '900', '1990', 'AAA01', '100', '100', '0', '2025-09-08', '2025-09-11 07:25:21', '2025-09-11 07:25:21');
INSERT INTO `tbl_trace_ability` VALUES (20, 12, 14, '2025-09-23', '100', '2140', 'AAA04', '100', '100', '0', '2025-09-22', '2025-09-11 07:25:21', '2025-09-11 07:25:21');
INSERT INTO `tbl_trace_ability` VALUES (24, 14, 21, '2025-10-14', '10', '2', 'MLA01', '30', '12', '18', '2025-10-13', '2025-10-07 05:44:24', '2025-10-07 05:44:24');
INSERT INTO `tbl_trace_ability` VALUES (25, 13, 15, '2025-09-07', '4350', '3300', 'CL01', '25', '25', '0', '2025-09-06', '2025-10-07 06:45:04', '2025-10-07 06:45:04');
INSERT INTO `tbl_trace_ability` VALUES (26, 13, 16, '2025-09-01', '1000', '750', 'CL03', '30', '30', '0', '2025-08-31', '2025-10-07 06:45:04', '2025-10-07 06:45:04');
INSERT INTO `tbl_trace_ability` VALUES (27, 13, 15, '2025-09-07', '4350', '3300', 'CL03', '25', '25', '0', '2025-09-06', '2025-10-07 06:45:04', '2025-10-07 06:45:04');
INSERT INTO `tbl_trace_ability` VALUES (30, 16, 26, '2025-10-21', '10', '11', '3L05', '30', '30', '0', '2025-10-20', '2025-10-09 03:13:56', '2025-10-09 03:13:56');
INSERT INTO `tbl_trace_ability` VALUES (31, 16, 48, '2025-10-07', '1', '1', '3MLS', '24', '24', '0', '2025-10-06', '2025-10-09 03:13:56', '2025-10-09 03:13:56');
INSERT INTO `tbl_trace_ability` VALUES (32, 16, 49, '2025-10-30', '1', '0', 'LMA', '15', '15', '0', '2025-10-29', '2025-10-09 03:13:56', '2025-10-09 03:13:56');

SET FOREIGN_KEY_CHECKS = 1;
