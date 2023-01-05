-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 07, 2022 at 07:37 PM
-- Server version: 5.7.38
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bms`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `announcement_id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `a_what` varchar(250) NOT NULL,
  `a_where` varchar(250) NOT NULL,
  `a_when` date NOT NULL,
  `a_time` varchar(250) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`announcement_id`, `resident_id`, `a_what`, `a_where`, `a_when`, `a_time`, `date_created`, `status`) VALUES
(1, 1, 'Brgy. Meeting', 'Brgy. Hall', '2022-12-07', '2:30pm', '2022-12-07 11:25:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail`
--

CREATE TABLE `audit_trail` (
  `audit_trail_id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `action_performed` text NOT NULL,
  `action_details` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `audit_trail`
--

INSERT INTO `audit_trail` (`audit_trail_id`, `resident_id`, `action_performed`, `action_details`, `date_created`) VALUES
(1, 1, 'Login', 'Login module', '2022-12-07 19:11:28'),
(2, 2, 'Register', 'Login module', '2022-12-07 19:16:07'),
(3, 1, 'Login', 'Login module', '2022-12-07 19:16:26'),
(4, 1, 'Login', 'Login module', '2022-12-07 19:21:29'),
(5, 1, 'Logout', 'Logout module', '2022-12-07 19:22:40'),
(6, 1, 'Login', 'Login module', '2022-12-07 19:22:53'),
(7, 1, 'Add', 'Add Announcement module', '2022-12-07 19:25:55'),
(8, 1, 'Add', 'Add Equipment module', '2022-12-07 19:28:44'),
(9, 1, 'Add', 'Add Inventory module', '2022-12-07 19:29:06'),
(10, 1, 'Accept', 'Accept Account module', '2022-12-07 19:32:47'),
(11, 1, 'Logout', 'Logout module', '2022-12-07 19:33:03'),
(12, 2, 'Login', 'Login module', '2022-12-07 19:33:10'),
(13, 2, 'Request', 'Request Permit module', '2022-12-07 19:36:22'),
(14, 2, 'Logout', 'Logout module', '2022-12-07 19:36:32'),
(15, 1, 'Login', 'Login module', '2022-12-07 19:36:37');

-- --------------------------------------------------------

--
-- Table structure for table `blotter`
--

CREATE TABLE `blotter` (
  `blotter_id` int(11) NOT NULL,
  `complainant` varchar(250) NOT NULL,
  `complaint` varchar(500) NOT NULL,
  `suspect` varchar(250) NOT NULL,
  `involved` varchar(250) NOT NULL,
  `date_occured` date NOT NULL,
  `time_occured` varchar(250) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 active, 2 archive	'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(11) NOT NULL,
  `equipment_name` varchar(250) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 active, 2 inactive	'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `equipment_name`, `status`) VALUES
(1, 'Laptop', 1);

-- --------------------------------------------------------

--
-- Table structure for table `e_i`
--

CREATE TABLE `e_i` (
  `e_i_id` int(11) NOT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `inventory_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT '0',
  `used` int(11) DEFAULT '0',
  `repair` int(11) DEFAULT '0',
  `disposed` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `e_i`
--

INSERT INTO `e_i` (`e_i_id`, `equipment_id`, `inventory_id`, `stock`, `used`, `repair`, `disposed`) VALUES
(1, 1, 1, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `barcode_qrcode` varchar(250) NOT NULL,
  `brand_model` varchar(250) NOT NULL,
  `remarks` varchar(250) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL COMMENT '1 stock, 2 used, 3 repair, 4 disposed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `equipment_id`, `barcode_qrcode`, `brand_model`, `remarks`, `date_created`, `status`) VALUES
(1, 1, 'sample-barcode-00001', 'Lenovo', 'test', '2022-12-07 11:29:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `request_id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  `remarks` varchar(250) NOT NULL,
  `date_requested` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '3 deleted, 1 pending, 2 done'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_id`, `resident_id`, `type`, `remarks`, `date_requested`, `status`) VALUES
(1, 2, 'Brgy Permit', 'test', '2022-12-07 19:35:33', 1),
(2, 2, 'Brgy Permit', 'test', '2022-12-07 19:36:21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `resident`
--

CREATE TABLE `resident` (
  `resident_id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `middle_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `suffix_name` varchar(250) NOT NULL,
  `gender` varchar(250) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `civil_status` varchar(250) NOT NULL,
  `voter_status` int(11) DEFAULT NULL COMMENT '1 voter, 0 not voter',
  `occupation` varchar(250) NOT NULL,
  `contact_no` int(11) DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `street` varchar(250) NOT NULL,
  `barangay` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `province` varchar(250) NOT NULL,
  `status` int(11) DEFAULT NULL COMMENT '1 active, 3 deleted, 2 pending, 4 dead',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `resident`
--

INSERT INTO `resident` (`resident_id`, `email`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `gender`, `birthdate`, `civil_status`, `voter_status`, `occupation`, `contact_no`, `user_type_id`, `street`, `barangay`, `city`, `province`, `status`, `date_created`) VALUES
(1, 'admin@gmail.com', 'admin', '256043b527a5f98caf5e5b4a54be5fe054258499986ac7ea89e7a0f5bbc7f520dbee87c60ac525c887dcd2f1bbeb9ce6dd3424ffd05ec46084682775e33b7de8C58/YAwku7/RknIIQq4GgX0OW07UzeYplMf950r+XeE=', 'John', '', 'Doe', '', '1', '1997-09-20', '1', 1, 'IT', 909090909, 1, '69th', 'Culong', 'Guimba', 'Nueva Ecija', 1, '2022-12-07 18:45:50'),
(2, 'test@gmail.com', 'test', 'eba467396af11cb2d51584e107e0fcb0c8498feaaeb48805d444be4a1b7130fa1b241c10a9e8be67e329d717c82a4aae86dcdf9b5783c7efe18d1a6a4a5e94e0yhMeemjjjlAP7Laq+zhp+bWGEF1LWQr3vUSf/L+wwbY=', 'test', '', 'test', '', '2', '1997-09-20', '1', 1, 'test', 90990, 2, '22', 'Culong', 'Guimba', 'Nueva Ecija', 1, '2022-12-07 19:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `user_type_id` int(11) NOT NULL,
  `user_type_name` varchar(120) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 active, 0 inactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`user_type_id`, `user_type_name`, `status`) VALUES
(1, 'Administrator', 1),
(2, 'User', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `audit_trail`
--
ALTER TABLE `audit_trail`
  ADD PRIMARY KEY (`audit_trail_id`);

--
-- Indexes for table `blotter`
--
ALTER TABLE `blotter`
  ADD PRIMARY KEY (`blotter_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`);

--
-- Indexes for table `e_i`
--
ALTER TABLE `e_i`
  ADD PRIMARY KEY (`e_i_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `resident`
--
ALTER TABLE `resident`
  ADD PRIMARY KEY (`resident_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `audit_trail`
--
ALTER TABLE `audit_trail`
  MODIFY `audit_trail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `blotter`
--
ALTER TABLE `blotter`
  MODIFY `blotter_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `e_i`
--
ALTER TABLE `e_i`
  MODIFY `e_i_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `resident`
--
ALTER TABLE `resident`
  MODIFY `resident_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
