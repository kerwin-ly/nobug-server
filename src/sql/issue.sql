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

 Date: 17/05/2019 20:47:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for issue
-- ----------------------------
DROP TABLE IF EXISTS `issue`;
CREATE TABLE `issue` (
  `issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_project_id` int(11) NOT NULL COMMENT 'issue属于哪个项目',
  `issue_topic` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `assign_user_id` int(11) DEFAULT NULL COMMENT '指派人',
  `issue_desc` text COMMENT 'bug描述',
  `issue_level` tinyint(10) DEFAULT '0' COMMENT 'bug等级',
  `issue_create_date` datetime DEFAULT NULL COMMENT 'bug修复-开始时间',
  `issue_end_date` datetime DEFAULT NULL COMMENT 'bug修复-结束时间',
  PRIMARY KEY (`issue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
