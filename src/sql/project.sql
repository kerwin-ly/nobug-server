/*
 Navicat Premium Data Transfer

 Source Server         : nobug
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : nobug

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 17/05/2019 20:47:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) NOT NULL DEFAULT '' COMMENT '项目名称',
  `project_desc` text COMMENT '项目描述',
  `project_color` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `project_creator_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
