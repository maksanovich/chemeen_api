/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : db_chemeen1

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 18/11/2025 21:11:52
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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_bar
-- ----------------------------
INSERT INTO `tbl_bar` VALUES (12, 23, 'PC-1-1', 50, '2025-11-18', '2025-11-18', '1232', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-11-18 12:10:40', '2025-11-18 12:10:40');
INSERT INTO `tbl_bar` VALUES (13, 23, 'PC-1-2', 50, '2025-11-18', '2025-11-18', '3213', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-11-18 12:10:40', '2025-11-18 12:10:40');
INSERT INTO `tbl_bar` VALUES (14, 23, 'PC-2-1', 51, '2025-11-18', '2025-11-18', '322', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-11-18 12:10:40', '2025-11-18 12:10:40');
INSERT INTO `tbl_bar` VALUES (15, 23, 'PC-2-2', 51, '2025-11-18', '2025-11-18', '2321', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-11-18 12:10:40', '2025-11-18 12:10:40');
INSERT INTO `tbl_bar` VALUES (16, 23, 'PC-3-1', 52, '2025-11-18', '2025-11-18', '231', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-11-18 12:10:40', '2025-11-18 12:10:40');
INSERT INTO `tbl_bar` VALUES (17, 23, 'PC-3-2', 52, '2025-11-18', '2025-11-18', '23', 'Nil', 'Nil', 'Absent', 'Absent', 'Absent', 'Absent', '2025-11-18 12:10:40', '2025-11-18 12:10:40');

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
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_code_list
-- ----------------------------
INSERT INTO `tbl_code_list` VALUES (106, 23, 50, 'PC-1-1', 1, 17, 2000, '2025-11-18 12:08:08', '2025-11-18 12:08:08');
INSERT INTO `tbl_code_list` VALUES (107, 23, 50, 'PC-1-1', 1, 16, 330000, '2025-11-18 12:08:08', '2025-11-18 12:08:08');
INSERT INTO `tbl_code_list` VALUES (108, 23, 50, 'PC-1-1', 1, 11, 402300, '2025-11-18 12:08:08', '2025-11-18 12:08:08');
INSERT INTO `tbl_code_list` VALUES (109, 23, 50, 'PC-1-2', 1, 17, 51000, '2025-11-18 12:08:19', '2025-11-18 12:08:19');
INSERT INTO `tbl_code_list` VALUES (110, 23, 50, 'PC-1-2', 1, 16, 1924000, '2025-11-18 12:08:19', '2025-11-18 12:08:19');
INSERT INTO `tbl_code_list` VALUES (111, 23, 51, 'PC-2-1', 1, 10, 3400, '2025-11-18 12:08:33', '2025-11-18 12:08:33');
INSERT INTO `tbl_code_list` VALUES (112, 23, 51, 'PC-2-1', 1, 9, 58200, '2025-11-18 12:08:33', '2025-11-18 12:08:33');
INSERT INTO `tbl_code_list` VALUES (113, 23, 51, 'PC-2-1', 1, 5, 22590, '2025-11-18 12:08:33', '2025-11-18 12:08:33');
INSERT INTO `tbl_code_list` VALUES (114, 23, 51, 'PC-2-2', 1, 10, 727400, '2025-11-18 12:08:47', '2025-11-18 12:08:47');
INSERT INTO `tbl_code_list` VALUES (115, 23, 52, 'PC-3-1', 1, 9, 1231, '2025-11-18 12:08:59', '2025-11-18 12:08:59');
INSERT INTO `tbl_code_list` VALUES (116, 23, 52, 'PC-3-1', 1, 5, 22590, '2025-11-18 12:08:59', '2025-11-18 12:08:59');
INSERT INTO `tbl_code_list` VALUES (117, 23, 52, 'PC-3-1', 1, 10, 730800, '2025-11-18 12:08:59', '2025-11-18 12:08:59');
INSERT INTO `tbl_code_list` VALUES (118, 23, 52, 'PC-3-2', 1, 9, 56969, '2025-11-18 12:09:12', '2025-11-18 12:09:12');

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

-- ----------------------------
-- Table structure for tbl_elisa_pdf
-- ----------------------------
DROP TABLE IF EXISTS `tbl_elisa_pdf`;
CREATE TABLE `tbl_elisa_pdf`  (
  `pdfId` int NOT NULL AUTO_INCREMENT,
  `PIId` int NOT NULL,
  `pdfName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `filePath` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fileSize` int NOT NULL,
  `uploadDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`pdfId`) USING BTREE,
  UNIQUE INDEX `fileName`(`fileName` ASC) USING BTREE,
  INDEX `PIId`(`PIId` ASC) USING BTREE,
  CONSTRAINT `tbl_elisa_pdf_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_elisa_pdf
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 173 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_item_details
-- ----------------------------
INSERT INTO `tbl_item_details` VALUES (157, 50, 17, '1/2', '53000', '106000.00', '21', '2226000.00', '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_item_details` VALUES (158, 50, 16, 'U/1', '2254000', '4508000.00', '22', '99176000.00', '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_item_details` VALUES (159, 50, 12, '20/30', '', '', '1', '', '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_item_details` VALUES (160, 50, 11, '10/20', '402300', '804600.00', '32', '25747200.00', '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_item_details` VALUES (161, 50, 7, 'U/5', '', '', '1', '', '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_item_details` VALUES (162, 50, 6, 'U/3', '', '', '1', '', '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_item_details` VALUES (163, 51, 10, '13/15', '730800', '17539200.00', '23', '403401600.00', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (164, 51, 9, '8/12', '58200', '1396800.00', '43', '60062400.00', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (165, 51, 8, 'U/7', '', '', '1', '', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (166, 51, 5, '16/20', '22590', '542160.00', '123', '66685680.00', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (167, 51, 2, '21/25', '', '', '1', '', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (168, 52, 9, '8/12', '58200', '1396800.00', '43', '60062400.00', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (169, 52, 8, 'U/7', '', '', '1', '', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (170, 52, 5, '16/20', '22590', '542160.00', '123', '66685680.00', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (171, 52, 2, '21/25', '', '', '1', '', '2025-11-18 12:07:50', '2025-11-18 12:07:50');
INSERT INTO `tbl_item_details` VALUES (172, 52, 10, '13/15', '730800', '17539200.00', '23', '403401600.00', '2025-11-18 12:07:50', '2025-11-18 12:07:50');

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
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_items
-- ----------------------------
INSERT INTO `tbl_items` VALUES (50, 23, 'PC-01', 4, 19, 19, 10, 4, 9, '2025-11-18 12:07:12', '2025-11-18 12:07:12');
INSERT INTO `tbl_items` VALUES (51, 23, 'PC-2', 7, 21, 19, 9, 4, 2, '2025-11-18 12:07:49', '2025-11-18 12:07:49');
INSERT INTO `tbl_items` VALUES (52, 23, 'PC-2', 7, 21, 19, 9, 4, 2, '2025-11-18 12:07:50', '2025-11-18 12:07:50');

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
  `POQuality` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_pi
-- ----------------------------
INSERT INTO `tbl_pi` VALUES (23, 'ARN123/181125', '2025-11-18', '33ABG2511BCH41', 'ARN123PO64436', NULL, NULL, '2025-11-18', 7, 6, 9, 3, 'LC On Site', 4, 3, NULL, NULL, '2025-11-18 12:06:26', '2025-11-18 12:06:26', 'Good');

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
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbl_trace_ability
-- ----------------------------
INSERT INTO `tbl_trace_ability` VALUES (33, 23, 50, '2025-11-18', '12310', '23340', 'PC-1-1', '734300', '0', '0', '2025-11-17', '2025-11-18 12:09:45', '2025-11-18 12:09:45');
INSERT INTO `tbl_trace_ability` VALUES (34, 23, 50, '2025-11-18', '242340', '23420', 'PC-1-2', '1975000', '0', '0', '2025-11-17', '2025-11-18 12:09:45', '2025-11-18 12:09:45');
INSERT INTO `tbl_trace_ability` VALUES (35, 23, 51, '2025-11-18', '324320', '2340', 'PC-2-1', '84190', '0', '0', '2025-11-17', '2025-11-18 12:09:45', '2025-11-18 12:09:45');
INSERT INTO `tbl_trace_ability` VALUES (36, 23, 51, '2025-11-18', '32420', '3420', 'PC-2-2', '727400', '0', '0', '2025-11-17', '2025-11-18 12:09:45', '2025-11-18 12:09:45');
INSERT INTO `tbl_trace_ability` VALUES (37, 23, 52, '2025-11-18', '340', '2340', 'PC-3-1', '754621', '0', '0', '2025-11-17', '2025-11-18 12:09:45', '2025-11-18 12:09:45');
INSERT INTO `tbl_trace_ability` VALUES (38, 23, 52, '2025-11-18', '234320', '3240', 'PC-3-2', '56969', '0', '0', '2025-11-17', '2025-11-18 12:09:45', '2025-11-18 12:09:45');

SET FOREIGN_KEY_CHECKS = 1;
