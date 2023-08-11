/**
 * 邀请码及分享二维码
 * @interface
 */
export interface Share {
  /**
   * 邀请码
   * @type {string}
   */
  invitationCode: string

  /**
   * 二维码
   * @type {string}
   */
  path: string
}

/**
 * 邀请记录
 * @interface
 */
export interface InvitationRecord {
  /**
   * 用户头像
   * @type {string}
   */
  userPhoto: string

  /**
   * 用户昵称
   * @type {string}
   */
  userNickname: string

  /**
   * 时间
   * @type {string} 
   */
  time: string
}