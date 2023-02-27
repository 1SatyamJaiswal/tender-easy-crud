-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: contractor_system
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `engineer`
--

DROP TABLE IF EXISTS `engineer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `engineer` (
  `User_Name` varchar(10) NOT NULL,
  `User_Type` char(1) NOT NULL,
  `Qualification` varchar(20) NOT NULL,
  `Location` varchar(20) NOT NULL,
  `Joining_date` date NOT NULL,
  KEY `User_Name` (`User_Name`),
  CONSTRAINT `engineer_ibfk_1` FOREIGN KEY (`User_Name`) REFERENCES `user` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engineer`
--

LOCK TABLES `engineer` WRITE;
/*!40000 ALTER TABLE `engineer` DISABLE KEYS */;
/*!40000 ALTER TABLE `engineer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engineer_project`
--

DROP TABLE IF EXISTS `engineer_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `engineer_project` (
  `Engineer_Id` varchar(10) NOT NULL,
  `Project_Id` varchar(10) NOT NULL,
  KEY `Engineer_Id` (`Engineer_Id`),
  KEY `Project_Id` (`Project_Id`),
  CONSTRAINT `engineer_project_ibfk_1` FOREIGN KEY (`Engineer_Id`) REFERENCES `engineer` (`User_Name`),
  CONSTRAINT `engineer_project_ibfk_2` FOREIGN KEY (`Project_Id`) REFERENCES `project` (`Project_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engineer_project`
--

LOCK TABLES `engineer_project` WRITE;
/*!40000 ALTER TABLE `engineer_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `engineer_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labour`
--

DROP TABLE IF EXISTS `labour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labour` (
  `Project_Id` varchar(10) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Work` varchar(15) DEFAULT NULL,
  `Daily_Wage` int DEFAULT NULL,
  KEY `Project_Id` (`Project_Id`),
  CONSTRAINT `labour_ibfk_1` FOREIGN KEY (`Project_Id`) REFERENCES `project` (`Project_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labour`
--

LOCK TABLES `labour` WRITE;
/*!40000 ALTER TABLE `labour` DISABLE KEYS */;
/*!40000 ALTER TABLE `labour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `User_Name` varchar(10) NOT NULL,
  `User_Type` char(1) NOT NULL,
  `Working_Hours` int DEFAULT NULL,
  KEY `User_Name` (`User_Name`),
  CONSTRAINT `office_ibfk_1` FOREIGN KEY (`User_Name`) REFERENCES `user` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES ('2021600028','O',8);
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_no`
--

DROP TABLE IF EXISTS `phone_no`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_no` (
  `User_Name` varchar(10) NOT NULL,
  `Phone_No` int NOT NULL,
  PRIMARY KEY (`Phone_No`),
  KEY `User_Name` (`User_Name`),
  CONSTRAINT `phone_no_ibfk_1` FOREIGN KEY (`User_Name`) REFERENCES `user` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_no`
--

LOCK TABLES `phone_no` WRITE;
/*!40000 ALTER TABLE `phone_no` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_no` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `Project_Id` varchar(10) NOT NULL,
  `Project_Deadline` date NOT NULL,
  `Site` varchar(20) NOT NULL,
  `Tender_Id` varchar(10) NOT NULL,
  PRIMARY KEY (`Project_Id`),
  KEY `Tender_Id` (`Tender_Id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Tender_Id`) REFERENCES `tender` (`Tender_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplies`
--

DROP TABLE IF EXISTS `supplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplies` (
  `Project_Id` varchar(10) NOT NULL,
  `Item` varchar(20) NOT NULL,
  `Quantity` int NOT NULL,
  `Price` int NOT NULL,
  KEY `Project_Id` (`Project_Id`),
  CONSTRAINT `supplies_ibfk_1` FOREIGN KEY (`Project_Id`) REFERENCES `project` (`Project_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplies`
--

LOCK TABLES `supplies` WRITE;
/*!40000 ALTER TABLE `supplies` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tender`
--

DROP TABLE IF EXISTS `tender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tender` (
  `User_Name` varchar(10) NOT NULL,
  `Company_Name` varchar(30) NOT NULL,
  `Tender_Id` varchar(10) NOT NULL,
  `Estimated_Cost` float NOT NULL,
  `Location` varchar(20) NOT NULL,
  `Start_Date` date NOT NULL,
  `Tender_Info` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Tender_Id`),
  KEY `User_Name` (`User_Name`),
  CONSTRAINT `tender_ibfk_1` FOREIGN KEY (`User_Name`) REFERENCES `user` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tender`
--

LOCK TABLES `tender` WRITE;
/*!40000 ALTER TABLE `tender` DISABLE KEYS */;
/*!40000 ALTER TABLE `tender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_Name` varchar(10) NOT NULL,
  `Password` varchar(8) NOT NULL,
  `User_Type` char(1) NOT NULL,
  `F_Name` varchar(10) NOT NULL,
  `M_Name` varchar(10) DEFAULT NULL,
  `L_Name` varchar(10) DEFAULT NULL,
  `Age` int NOT NULL,
  `Salary` int NOT NULL,
  PRIMARY KEY (`User_Name`,`Password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2021600028','12345678','O','Satyam','Rajesh','Jaiswal',25,50000);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-05 20:28:40
