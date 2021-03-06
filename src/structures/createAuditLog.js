const actions = {
	1: "GUILD_UPDATE",
	10: "CHANNEL_CREATE",
	11: "CHANNEL_UPDATE",
	12: "CHANNEL_DELETE",
	13: "CHANNEL_OVERWRITE_CREATE",
	14: "CHANNEL_OVERWRITE_UPDATE",
	15: "CHANNEL_OVERWRITE_DELETE",
	20: "MEMBER_KICK",
	21: "MEMBER_PRUNE",
	22: "MEMBER_BAN_ADD",
	23: "MEMBER_BAN_REMOVE",
	24: "MEMBER_UPDATE",
	25: "MEMBER_ROLE_UPDATE",
	26: "MEMBER_MOVE",
	27: "MEMBER_DISCONNECT",
	28: "BOT_ADD",
	30: "ROLE_CREATE",
	31: "ROLE_UPDATE",
	32: "ROLE_DELETE",
	40: "INVITE_CREATE",
	41: "INVITE_UPDATE",
	42: "INVITE_DELETE",
	50: "WEBHOOK_CREATE",
	51: "WEBHOOK_UPDATE",
	52: "WEBHOOK_DELETE",
	60: "EMOJI_CREATE",
	61: "EMOJI_UPDATE",
	62: "EMOJI_DELETE",
	72: "MESSAGE_DELETE",
	73: "MESSAGE_BULK_DELETE",
	74: "MESSAGE_PIN",
	75: "MESSAGE_UNPIN",
	80: "INTEGRATION_CREATE",
	81: "INTEGRATION_UPDATE",
	82: "INTEGRATION_DELETE"
}

const createAuditLog = (async(data) => {
  const {cache} = require("../botProperties.js");
  const request = require("../utils/request.js")
  const createUser = require("./createUser.js");

	const d = {};

	d.id = data.id;

	if(data.user_id) {
		var req = await request("GET", "/users/"+data.user_id)
		d.executor = createUser(req);
	}

	if(data.target_id) {
		var req = await request("GET", "/users/"+data.target_id)
		d.target = createUser(req);
	}

	d.action = actions[data.action_type];
	
	d.changes = data.changes;

	return d;
});

module.exports = createAuditLog;
