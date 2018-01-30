const { Wechaty, Room } = require("wechaty");

//contact 好友 ,room 群,message消息
Wechaty.instance()
  .on("scan", (url, code) => {
    if (!/201|200/.test(String(code))) {
      const loginUrl = url.replace(/\/qrcode\//, "/l/");
      require("qrcode-terminal").generate(loginUrl);
    }
    console.log(url);
  })

  .on("login", user => {
    console.log(`${user} login`);
  })

  .on("friend", async function(contact, request) {
    if (request) {
      await request.accept();
      console.log(`Contact: ${contact.name()} send request ${request.hello}`);
    }
  })

  .on("message", async function(m) {
    const contact = m.from(); //好友
    const content = m.content(); //内容
    const room = m.room(); //群

    if (room) {
      console.log(
        `Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`
      );
    } else {
      console.log(`Contact: ${contact.name()} Content: ${content}`);
    }

    if (m.self()) {
      return;
    }

    if (/你好/.test(content)) {
      m.say("你好，我也好,他应该也不错!!");
    }

    if (/ppt/.test(content)) {
      m.say("ppt做的好，也能当饭吃！！！");
    }

    /*
    if (/hello/.test(content)) {
      m.say("别再说了，好烦躁！！！");
	}
	*/

    if (/生日/.test(content)) {
      m.say("祝你生日最快乐");
    }

    if (/支付宝/.test(content)) {
      m.say("别再发支付宝红包了，好好工作，我是一个烦躁的机器人！！！");
    }

    if (/美女/.test(content)) {
      m.say("好好撸代码，别在群里哔哔");
    }

    if (/撸代码/.test(content)) {
      m.say("好好撸代码，加了个油！以后一定会牛逼！！！");
    }

    if (room && /test/.test(room.topic())) {
      if (m.type() === MsgType.Text) {
        const reply = await unitClient.query(
          content,
          contact.id.replace("@", "")
        );
        room.say(replay, contact);
      }
    }
    if (/room/.test(content)) {
      let keyroom = await Room.find({ topic: "test" });
      if (keyroom) {
        await keyroom.add(contact);
        await keyroom.say("welcome!", contact);
      }
    }

    if (/out/.test(content)) {
      let keyroom = await Room.find({ topic: "test" });
      if (keyroom) {
        await keyroom.say("Remove from the room", contact);
        await keyroom.del(contact);
      }
    }
  })

  .init();
// master modify  sth.
