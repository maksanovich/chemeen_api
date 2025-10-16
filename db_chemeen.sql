-- MySQL dump 10.19  Distrib 10.3.39-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_chemeen
-- ------------------------------------------------------
-- Server version	10.3.39-MariaDB-0+deb10u1~bpo22.04+1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_banks`
--

DROP TABLE IF EXISTS `tbl_banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_banks` (
  `bankId` int(11) NOT NULL AUTO_INCREMENT,
  `bankName` varchar(255) NOT NULL,
  `acNo` varchar(255) NOT NULL,
  `swift` varchar(255) NOT NULL,
  `IFSCCode` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `pinCode` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`bankId`),
  UNIQUE KEY `bankName` (`bankName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_banks`
--

LOCK TABLES `tbl_banks` WRITE;
/*!40000 ALTER TABLE `tbl_banks` DISABLE KEYS */;
INSERT INTO `tbl_banks` VALUES (1,'Paypal','345','22435','4563234','NJ, NJ, NJ','','nj','nj','nj','123','','','','2024-11-29 10:08:02','2024-11-29 10:08:02'),(2,'JPMorgan Chase Bank','20000011141367','CHASUS33','444','JPMORGAN Chase ','NewYork','NewYork','NewYork','United States of America','10017','444','','','2024-11-29 10:30:08','2024-11-29 10:30:08');
/*!40000 ALTER TABLE `tbl_banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bar`
--

DROP TABLE IF EXISTS `tbl_bar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bar` (
  `BARId` int(11) NOT NULL AUTO_INCREMENT,
  `PIId` int(11) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `analysisDate` varchar(255) NOT NULL,
  `completionDate` varchar(255) NOT NULL,
  `totalPlateCnt` varchar(255) NOT NULL,
  `ECFU` varchar(255) NOT NULL,
  `SCFU` varchar(255) NOT NULL,
  `salmone` varchar(255) NOT NULL,
  `vibrioC` varchar(255) NOT NULL,
  `vibrioP` varchar(255) NOT NULL,
  `listeria` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`BARId`),
  KEY `PIId` (`PIId`),
  CONSTRAINT `tbl_bar_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bar`
--

LOCK TABLES `tbl_bar` WRITE;
/*!40000 ALTER TABLE `tbl_bar` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_code_list`
--

DROP TABLE IF EXISTS `tbl_code_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_code_list` (
  `codeId` int(11) NOT NULL AUTO_INCREMENT,
  `PIId` int(11) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `farmId` int(11) DEFAULT NULL,
  `PRSGId` int(11) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codeId`),
  UNIQUE KEY `code` (`code`),
  KEY `PIId` (`PIId`),
  KEY `farmId` (`farmId`),
  KEY `PRSGId` (`PRSGId`),
  CONSTRAINT `tbl_code_list_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_code_list_ibfk_2` FOREIGN KEY (`farmId`) REFERENCES `tbl_companies` (`companyId`),
  CONSTRAINT `tbl_code_list_ibfk_3` FOREIGN KEY (`PRSGId`) REFERENCES `tbl_prsg` (`PRSGId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_code_list`
--

LOCK TABLES `tbl_code_list` WRITE;
/*!40000 ALTER TABLE `tbl_code_list` DISABLE KEYS */;
INSERT INTO `tbl_code_list` VALUES (1,1,'A-1',4,1,5,'2024-11-29 10:20:52','2024-11-29 10:20:52'),(3,1,'A-2',4,1,6,'2024-11-29 10:20:52','2024-11-29 10:20:52');
/*!40000 ALTER TABLE `tbl_code_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_companies`
--

DROP TABLE IF EXISTS `tbl_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_companies` (
  `companyId` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `approvalNo` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `pinCode` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`companyId`),
  UNIQUE KEY `companyName` (`companyName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_companies`
--

LOCK TABLES `tbl_companies` WRITE;
/*!40000 ALTER TABLE `tbl_companies` DISABLE KEYS */;
INSERT INTO `tbl_companies` VALUES (1,'Exporter','GIMMS','120394','NJ, NJ, US','','NJ','NJ','US','123','','','','2024-11-29 10:06:20','2024-11-29 10:06:20'),(2,'Processor','RDP','12345','NH,NH,NJ','NH','NH','NJ','US','123','','','','2024-11-29 10:07:06','2024-11-29 10:07:06'),(3,'Consignee','BUSSU','34123','aaa','','aaa','aaa','aa','123','','','','2024-11-29 10:07:31','2024-11-29 10:07:31'),(4,'Farmer','Farm1','1234','asd','asdf','sadf','sadf','asdf','123','','','','2024-11-29 10:20:07','2024-11-29 10:20:07'),(5,'Exporter','GAYATRI AQUA PRODUCTS PVT LTD','12','H. No. 8, Chillakur village','Nellore District','Nellore district','Andhrapradesh','India','524412','','','','2024-11-29 10:25:17','2024-11-29 10:25:17');
/*!40000 ALTER TABLE `tbl_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_elisa`
--

DROP TABLE IF EXISTS `tbl_elisa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_elisa` (
  `elisaId` int(11) NOT NULL AUTO_INCREMENT,
  `PIId` int(11) DEFAULT NULL,
  `testReportNo` varchar(255) NOT NULL,
  `testReportDate` varchar(255) NOT NULL,
  `rawMeterialDate` varchar(255) NOT NULL,
  `productionCode` varchar(255) NOT NULL,
  `sampleDrawnBy` varchar(255) NOT NULL,
  `sampleId` varchar(255) NOT NULL,
  `rawMaterialType` varchar(255) NOT NULL,
  `rawMaterialReceived` varchar(255) NOT NULL,
  `pondId` varchar(255) NOT NULL,
  `samplingDate` varchar(255) NOT NULL,
  `samplingReceiptDate` varchar(255) NOT NULL,
  `testedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`elisaId`),
  KEY `PIId` (`PIId`),
  CONSTRAINT `tbl_elisa_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_elisa`
--

LOCK TABLES `tbl_elisa` WRITE;
/*!40000 ALTER TABLE `tbl_elisa` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_elisa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_elisa_detail`
--

DROP TABLE IF EXISTS `tbl_elisa_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_elisa_detail` (
  `elisaDetailId` int(11) NOT NULL AUTO_INCREMENT,
  `PIId` int(11) DEFAULT NULL,
  `testParam` varchar(255) NOT NULL,
  `RPA` varchar(255) NOT NULL,
  `CCB` varchar(255) NOT NULL,
  `cutOffLevel` varchar(255) NOT NULL,
  `testMethod` varchar(255) NOT NULL,
  `validationMethod` varchar(255) NOT NULL,
  `analyticsInstrument` varchar(255) NOT NULL,
  `startDateAnalysis` varchar(255) NOT NULL,
  `completionDateAnalysis` varchar(255) NOT NULL,
  `testResult` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`elisaDetailId`),
  KEY `PIId` (`PIId`),
  CONSTRAINT `tbl_elisa_detail_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_elisa_detail`
--

LOCK TABLES `tbl_elisa_detail` WRITE;
/*!40000 ALTER TABLE `tbl_elisa_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_elisa_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pi`
--

DROP TABLE IF EXISTS `tbl_pi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_pi` (
  `PIId` int(11) NOT NULL AUTO_INCREMENT,
  `PINo` varchar(255) NOT NULL,
  `PIDate` varchar(255) NOT NULL,
  `GSTIn` varchar(255) NOT NULL,
  `PONumber` varchar(255) NOT NULL,
  `POQuality` varchar(255) NOT NULL,
  `shipDate` varchar(255) NOT NULL,
  `exporterId` int(11) DEFAULT NULL,
  `processorId` int(11) DEFAULT NULL,
  `consigneeId` int(11) DEFAULT NULL,
  `bankId` int(11) DEFAULT NULL,
  `TDP` varchar(255) NOT NULL,
  `loadingPortId` int(11) DEFAULT NULL,
  `dischargePortId` int(11) DEFAULT NULL,
  `marksNo` varchar(255) NOT NULL,
  `PRFId` int(11) DEFAULT NULL,
  `PRSId` int(11) DEFAULT NULL,
  `PRSTId` int(11) DEFAULT NULL,
  `PRSPId` int(11) DEFAULT NULL,
  `PRSVId` int(11) DEFAULT NULL,
  `PRSPSId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PIId`),
  UNIQUE KEY `PINo` (`PINo`),
  KEY `exporterId` (`exporterId`),
  KEY `processorId` (`processorId`),
  KEY `consigneeId` (`consigneeId`),
  KEY `bankId` (`bankId`),
  KEY `loadingPortId` (`loadingPortId`),
  KEY `dischargePortId` (`dischargePortId`),
  KEY `PRFId` (`PRFId`),
  KEY `PRSId` (`PRSId`),
  KEY `PRSTId` (`PRSTId`),
  KEY `PRSPId` (`PRSPId`),
  KEY `PRSVId` (`PRSVId`),
  KEY `PRSPSId` (`PRSPSId`),
  CONSTRAINT `tbl_pi_ibfk_1` FOREIGN KEY (`exporterId`) REFERENCES `tbl_companies` (`companyId`),
  CONSTRAINT `tbl_pi_ibfk_10` FOREIGN KEY (`PRSPId`) REFERENCES `tbl_prsp` (`PRSPId`),
  CONSTRAINT `tbl_pi_ibfk_11` FOREIGN KEY (`PRSVId`) REFERENCES `tbl_prsv` (`PRSVId`),
  CONSTRAINT `tbl_pi_ibfk_12` FOREIGN KEY (`PRSPSId`) REFERENCES `tbl_prsps` (`PRSPSId`),
  CONSTRAINT `tbl_pi_ibfk_2` FOREIGN KEY (`processorId`) REFERENCES `tbl_companies` (`companyId`),
  CONSTRAINT `tbl_pi_ibfk_3` FOREIGN KEY (`consigneeId`) REFERENCES `tbl_companies` (`companyId`),
  CONSTRAINT `tbl_pi_ibfk_4` FOREIGN KEY (`bankId`) REFERENCES `tbl_banks` (`bankId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_pi_ibfk_5` FOREIGN KEY (`loadingPortId`) REFERENCES `tbl_ports` (`portId`),
  CONSTRAINT `tbl_pi_ibfk_6` FOREIGN KEY (`dischargePortId`) REFERENCES `tbl_ports` (`portId`),
  CONSTRAINT `tbl_pi_ibfk_7` FOREIGN KEY (`PRFId`) REFERENCES `tbl_prf` (`PRFId`),
  CONSTRAINT `tbl_pi_ibfk_8` FOREIGN KEY (`PRSId`) REFERENCES `tbl_prs` (`PRSId`),
  CONSTRAINT `tbl_pi_ibfk_9` FOREIGN KEY (`PRSTId`) REFERENCES `tbl_prst` (`PRSTId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pi`
--

LOCK TABLES `tbl_pi` WRITE;
/*!40000 ALTER TABLE `tbl_pi` DISABLE KEYS */;
INSERT INTO `tbl_pi` VALUES (1,'MLS-10234','2024-11-28T10:14:00.000Z','gSIn','M-01','Fresh','2024-11-30T10:15:00.000Z',1,2,3,1,'TDP',2,1,'4500MCS',3,1,1,2,1,2,'2024-11-29 10:16:02','2024-11-29 10:19:12');
/*!40000 ALTER TABLE `tbl_pi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pi_details`
--

DROP TABLE IF EXISTS `tbl_pi_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_pi_details` (
  `PIDetailId` int(11) NOT NULL AUTO_INCREMENT,
  `PIId` int(11) DEFAULT NULL,
  `PRSGId` int(11) DEFAULT NULL,
  `size` varchar(255) NOT NULL,
  `cartons` varchar(255) NOT NULL,
  `kgQty` varchar(255) NOT NULL,
  `usdRate` varchar(255) NOT NULL,
  `usdAmount` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PIDetailId`),
  KEY `PIId` (`PIId`),
  KEY `PRSGId` (`PRSGId`),
  CONSTRAINT `tbl_pi_details_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_pi_details_ibfk_2` FOREIGN KEY (`PRSGId`) REFERENCES `tbl_prsg` (`PRSGId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pi_details`
--

LOCK TABLES `tbl_pi_details` WRITE;
/*!40000 ALTER TABLE `tbl_pi_details` DISABLE KEYS */;
INSERT INTO `tbl_pi_details` VALUES (3,1,2,'U2','5','36.00','1','36.00','2024-11-29 10:19:12','2024-11-29 10:19:12'),(4,1,1,'U1','16','115.20','2','230.40','2024-11-29 10:19:12','2024-11-29 10:19:12');
/*!40000 ALTER TABLE `tbl_pi_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ports`
--

DROP TABLE IF EXISTS `tbl_ports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_ports` (
  `portId` int(11) NOT NULL AUTO_INCREMENT,
  `portName` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`portId`),
  UNIQUE KEY `portName` (`portName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ports`
--

LOCK TABLES `tbl_ports` WRITE;
/*!40000 ALTER TABLE `tbl_ports` DISABLE KEYS */;
INSERT INTO `tbl_ports` VALUES (1,'Sapporo','Japan','2024-11-29 10:08:16','2024-11-29 10:08:16'),(2,'Kolkata','India','2024-11-29 10:08:26','2024-11-29 10:08:26'),(3,'Chennai ','India','2024-11-29 10:30:42','2024-11-29 10:30:42');
/*!40000 ALTER TABLE `tbl_ports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prf`
--

DROP TABLE IF EXISTS `tbl_prf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prf` (
  `PRFId` int(11) NOT NULL AUTO_INCREMENT,
  `PRFName` varchar(255) NOT NULL,
  `HSN` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRFId`),
  UNIQUE KEY `PRFName` (`PRFName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prf`
--

LOCK TABLES `tbl_prf` WRITE;
/*!40000 ALTER TABLE `tbl_prf` DISABLE KEYS */;
INSERT INTO `tbl_prf` VALUES (1,'Shrimp','56345','2024-11-29 10:08:39','2024-11-29 10:08:39'),(2,'AMKS','78546','2024-11-29 10:08:48','2024-11-29 10:08:48'),(3,'Shrimps','030617','2024-11-29 10:08:54','2024-11-29 10:08:54');
/*!40000 ALTER TABLE `tbl_prf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prs`
--

DROP TABLE IF EXISTS `tbl_prs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prs` (
  `PRSId` int(11) NOT NULL AUTO_INCREMENT,
  `PRFId` int(11) DEFAULT NULL,
  `PRSName` varchar(255) NOT NULL,
  `scientificName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSId`),
  UNIQUE KEY `PRSName` (`PRSName`),
  KEY `PRFId` (`PRFId`),
  CONSTRAINT `tbl_prs_ibfk_1` FOREIGN KEY (`PRFId`) REFERENCES `tbl_prf` (`PRFId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prs`
--

LOCK TABLES `tbl_prs` WRITE;
/*!40000 ALTER TABLE `tbl_prs` DISABLE KEYS */;
INSERT INTO `tbl_prs` VALUES (1,3,'Tiger','Penaeus monodon','2024-11-29 10:09:03','2024-11-29 10:10:00');
/*!40000 ALTER TABLE `tbl_prs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prsg`
--

DROP TABLE IF EXISTS `tbl_prsg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prsg` (
  `PRSGId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSPSId` int(11) DEFAULT NULL,
  `PRSGDesc` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSGId`),
  KEY `PRSPSId` (`PRSPSId`),
  CONSTRAINT `tbl_prsg_ibfk_1` FOREIGN KEY (`PRSPSId`) REFERENCES `tbl_prsps` (`PRSPSId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prsg`
--

LOCK TABLES `tbl_prsg` WRITE;
/*!40000 ALTER TABLE `tbl_prsg` DISABLE KEYS */;
INSERT INTO `tbl_prsg` VALUES (1,2,'U1','2024-11-29 10:11:17','2024-11-29 10:11:17'),(2,2,'U2','2024-11-29 10:11:24','2024-11-29 10:11:24');
/*!40000 ALTER TABLE `tbl_prsg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prsp`
--

DROP TABLE IF EXISTS `tbl_prsp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prsp` (
  `PRSPId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSPPiece` varchar(255) NOT NULL,
  `PRSPWeight` varchar(255) NOT NULL,
  `PRSPWId` int(11) DEFAULT NULL,
  `PRSPWSId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPId`),
  KEY `PRSPWId` (`PRSPWId`),
  KEY `PRSPWSId` (`PRSPWSId`),
  CONSTRAINT `tbl_prsp_ibfk_1` FOREIGN KEY (`PRSPWId`) REFERENCES `tbl_prspw` (`PRSPWId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tbl_prsp_ibfk_2` FOREIGN KEY (`PRSPWSId`) REFERENCES `tbl_prspws` (`PRSPWSId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prsp`
--

LOCK TABLES `tbl_prsp` WRITE;
/*!40000 ALTER TABLE `tbl_prsp` DISABLE KEYS */;
INSERT INTO `tbl_prsp` VALUES (1,'1','5',1,1,'2024-11-29 10:14:18','2024-11-29 10:14:18'),(2,'6','1.2',2,1,'2024-11-29 10:14:35','2024-11-29 10:14:35');
/*!40000 ALTER TABLE `tbl_prsp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prsps`
--

DROP TABLE IF EXISTS `tbl_prsps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prsps` (
  `PRSPSId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSPSDesc` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPSId`),
  UNIQUE KEY `PRSPSDesc` (`PRSPSDesc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prsps`
--

LOCK TABLES `tbl_prsps` WRITE;
/*!40000 ALTER TABLE `tbl_prsps` DISABLE KEYS */;
INSERT INTO `tbl_prsps` VALUES (1,'Hon','2024-11-29 10:10:56','2024-11-29 10:10:56'),(2,'HSL','2024-11-29 10:11:02','2024-11-29 10:11:02');
/*!40000 ALTER TABLE `tbl_prsps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prspw`
--

DROP TABLE IF EXISTS `tbl_prspw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prspw` (
  `PRSPWId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSPWUnit` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPWId`),
  UNIQUE KEY `PRSPWUnit` (`PRSPWUnit`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prspw`
--

LOCK TABLES `tbl_prspw` WRITE;
/*!40000 ALTER TABLE `tbl_prspw` DISABLE KEYS */;
INSERT INTO `tbl_prspw` VALUES (1,'Kg','2024-11-29 10:10:11','2024-11-29 10:10:11'),(2,'Lbs','2024-11-29 10:10:15','2024-11-29 10:10:15');
/*!40000 ALTER TABLE `tbl_prspw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prspws`
--

DROP TABLE IF EXISTS `tbl_prspws`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prspws` (
  `PRSPWSId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSPWSStyle` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSPWSId`),
  UNIQUE KEY `PRSPWSStyle` (`PRSPWSStyle`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prspws`
--

LOCK TABLES `tbl_prspws` WRITE;
/*!40000 ALTER TABLE `tbl_prspws` DISABLE KEYS */;
INSERT INTO `tbl_prspws` VALUES (1,'net weight/net count','2024-11-29 10:10:30','2024-11-29 10:10:30');
/*!40000 ALTER TABLE `tbl_prspws` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prst`
--

DROP TABLE IF EXISTS `tbl_prst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prst` (
  `PRSTId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSTName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSTId`),
  UNIQUE KEY `PRSTName` (`PRSTName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prst`
--

LOCK TABLES `tbl_prst` WRITE;
/*!40000 ALTER TABLE `tbl_prst` DISABLE KEYS */;
INSERT INTO `tbl_prst` VALUES (1,'Frozen Head on shell on H/on','2024-11-29 10:09:51','2024-11-29 10:10:56');
/*!40000 ALTER TABLE `tbl_prst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_prsv`
--

DROP TABLE IF EXISTS `tbl_prsv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_prsv` (
  `PRSVId` int(11) NOT NULL AUTO_INCREMENT,
  `PRSVDesc` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRSVId`),
  UNIQUE KEY `PRSVDesc` (`PRSVDesc`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_prsv`
--

LOCK TABLES `tbl_prsv` WRITE;
/*!40000 ALTER TABLE `tbl_prsv` DISABLE KEYS */;
INSERT INTO `tbl_prsv` VALUES (1,'Nobashi','2024-11-29 10:10:44','2024-11-29 10:10:44');
/*!40000 ALTER TABLE `tbl_prsv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_test`
--

DROP TABLE IF EXISTS `tbl_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_test` (
  `testId` int(11) NOT NULL AUTO_INCREMENT,
  `testDesc` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`testId`),
  UNIQUE KEY `testDesc` (`testDesc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_test`
--

LOCK TABLES `tbl_test` WRITE;
/*!40000 ALTER TABLE `tbl_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_trace_ability`
--

DROP TABLE IF EXISTS `tbl_trace_ability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_trace_ability` (
  `traceAbilityId` int(11) NOT NULL AUTO_INCREMENT,
  `PIId` int(11) DEFAULT NULL,
  `productDate` varchar(255) NOT NULL,
  `rawMaterialQty` varchar(255) NOT NULL,
  `headlessQty` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `usedCase` varchar(255) NOT NULL,
  `ballanceCase` varchar(255) NOT NULL,
  `beforeDate` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`traceAbilityId`),
  KEY `PIId` (`PIId`),
  CONSTRAINT `tbl_trace_ability_ibfk_1` FOREIGN KEY (`PIId`) REFERENCES `tbl_pi` (`PIId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_trace_ability`
--

LOCK TABLES `tbl_trace_ability` WRITE;
/*!40000 ALTER TABLE `tbl_trace_ability` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_trace_ability` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-29 10:32:19
