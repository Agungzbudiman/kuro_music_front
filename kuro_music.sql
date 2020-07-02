/*
Navicat MySQL Data Transfer

Source Server         : my sql
Source Server Version : 100316
Source Host           : localhost:3306
Source Database       : kuro_music

Target Server Type    : MYSQL
Target Server Version : 100316
File Encoding         : 65001

Date: 2020-06-30 10:56:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type` tinyint(4) DEFAULT 1 COMMENT '1 = user, 4 = admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('1', 'jojo', 'e10adc3949ba59abbe56e057f20f883e', '1');
INSERT INTO `tbl_user` VALUES ('2', 'pancono', 'e10adc3949ba59abbe56e057f20f883e', '1');
INSERT INTO `tbl_user` VALUES ('3', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '4');

-- ----------------------------
-- Table structure for tbm_music
-- ----------------------------
DROP TABLE IF EXISTS `tbm_music`;
CREATE TABLE `tbm_music` (
  `id` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `time` char(5) DEFAULT NULL,
  `sing` varchar(50) DEFAULT NULL,
  `name_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbm_music
-- ----------------------------
INSERT INTO `tbm_music` VALUES ('ajwvt1592033962', 'Lily', '03:16', 'Alan Walker', 'ajwvt1592033962.mp3');
INSERT INTO `tbm_music` VALUES ('akwhp1592033982', 'no tears left to cry', '03:58', 'Ariana Grande', 'akwhp1592033982.mp3');
INSERT INTO `tbm_music` VALUES ('bjpfr1592034062', 'Pyscho', '03:36', 'Red Velvet', 'bjpfr1592034062.mp3');
INSERT INTO `tbm_music` VALUES ('efmqc1592034199', 'TT', '04:14', 'Twice', 'efmqc1592034199.mp3');
INSERT INTO `tbm_music` VALUES ('hwvin1592034118', 'If I Cant Have You', '03:12', 'Shawn Mendes', 'hwvin1592034118.mp3');
INSERT INTO `tbm_music` VALUES ('idwan1592033895', 'comethru', '03:01', 'Jeremy Zucker', 'idwan1592033895.mp3');
INSERT INTO `tbm_music` VALUES ('jhcsd1592034160', 'Scared To Be Lonely', '03:50', 'Martin Garrix, Dua Lipa', 'jhcsd1592034160.mp3');
INSERT INTO `tbm_music` VALUES ('jyqwx1592034083', 'Sweet but Pyscho', '03:27', 'Ava Max', 'jyqwx1592034083.mp3');
INSERT INTO `tbm_music` VALUES ('lxivu1592034186', 'Fancy', '03:39', 'Twice', 'lxivu1592034186.mp3');
INSERT INTO `tbm_music` VALUES ('oazfy1592034176', 'All Falls Down', '03:25', 'Alan Walker', 'oazfy1592034176.mp3');
INSERT INTO `tbm_music` VALUES ('rxosl1592034025', 'Old Town Road', '05:09', 'Lil Nas X', 'rxosl1592034025.mp3');
INSERT INTO `tbm_music` VALUES ('scydg1592034050', 'Solo', '02:57', 'Jennie', 'scydg1592034050.mp3');
INSERT INTO `tbm_music` VALUES ('senym1591952586', 'Kill This Love', '03:14', 'Blackpink', 'senym1591952586.mp3');
INSERT INTO `tbm_music` VALUES ('vfxns1592034010', 'None Of My Businness', '03:08', 'Cher Lloyd', 'vfxns1592034010.mp3');
INSERT INTO `tbm_music` VALUES ('vgktn1592034098', 'I Love You 3000', '03:30', 'Stephanie Poetri', 'vgktn1592034098.mp3');
INSERT INTO `tbm_music` VALUES ('vnymd1592034478', 'Lathi', '03:06', 'weird genius', 'vnymd1592034478.mp3');
INSERT INTO `tbm_music` VALUES ('wseaq1592034228', 'Whistle', '03:51', 'Blackpink', 'wseaq1592034228.mp3');
INSERT INTO `tbm_music` VALUES ('wyojd1592034037', 'Solo', '03:43', 'Clean Bandit', 'wyojd1592034037.mp3');
INSERT INTO `tbm_music` VALUES ('yphmk1592034211', 'Likey', '03:41', 'Twice', 'yphmk1592034211.mp3');
INSERT INTO `tbm_music` VALUES ('ywxnp1592034132', 'Earth', '07:11', 'Lil Dicky', 'ywxnp1592034132.mp3');

-- ----------------------------
-- Table structure for tbr_heart
-- ----------------------------
DROP TABLE IF EXISTS `tbr_heart`;
CREATE TABLE `tbr_heart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) DEFAULT NULL,
  `music_id` varchar(20) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbr_heart
-- ----------------------------
INSERT INTO `tbr_heart` VALUES ('4', '::1', 'lxivu1592034186');
INSERT INTO `tbr_heart` VALUES ('6', '1', 'ajwvt1592033962');
INSERT INTO `tbr_heart` VALUES ('7', '2', 'idwan1592033895');

-- ----------------------------
-- Table structure for tbr_playlist
-- ----------------------------
DROP TABLE IF EXISTS `tbr_playlist`;
CREATE TABLE `tbr_playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) DEFAULT NULL,
  `playlist_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbr_playlist
-- ----------------------------
INSERT INTO `tbr_playlist` VALUES ('1', '::1', 'Cocok');

-- ----------------------------
-- Table structure for tbr_playlist_music
-- ----------------------------
DROP TABLE IF EXISTS `tbr_playlist_music`;
CREATE TABLE `tbr_playlist_music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `music_id` varchar(20) DEFAULT NULL,
  `playlist_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbr_playlist_music
-- ----------------------------
INSERT INTO `tbr_playlist_music` VALUES ('1', 'ajwvt1592033962', '1');
SET FOREIGN_KEY_CHECKS=1;
