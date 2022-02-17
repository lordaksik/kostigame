require('dotenv').config();
const { Telegraf } = require('telegraf')
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.BOT_TOKEN || 8080)
bot.start((ctx) => {
   ctx.reply(`Привет ${ctx.message.from.first_name}`)
   console.log(ctx.message)
})
bot.help((ctx) => ctx.reply('Напиши /bot '))
bot.hears('/bot', async (ctx) => {
   async function request2() {

      const response = await fetch("https://betgames9.betgames.tv/web/v2/games/results/testpartner/en/0/2020-27-07/10/1/")
      const data = await response.json()
      var res=0,total=0;
      var total2=0;
      var total_men=0;
      var total_men2=0;
      for (let i = 0; i <= 29; i++) {
         number = data.items.results[i].results[0].number
         number2 = data.items.results[i].results[1].number
         if(number===number2){
            res++;
         }
      }
      if(res>0){
         ctx.reply("Ничьи не было 30 бросков");
      }
      for (let i = 0; i <= 6; i++) {
         number = data.items.results[i].results[0].number
         number2 = data.items.results[i].results[1].number
         console.log(number)
         if(number>3){
            total++;
         }
         if(number<4){
            total_men++;
         }
          if(number<4){
            total_men2++;
         }
         if(number2>3){
            total2++;
         }
         
      }
      console.log(total+" "+total2+" "+total_men+" "+total_men2)
     if(total===7){
     ctx.reply("7 бросков на красном больше 3 точек");
     }
       if(total2===7){
     ctx.reply("7 бросков на синем больше 3 точек");
     }
        if(total_men===7){
     ctx.reply("7 бросков на синем меньше 4 точек");
     }
        if(total_men2===7){
     ctx.reply("7 бросков на синем меньше 4 точек");
     }
   

   }
   function good() {
      ctx.reply( "Вы запустили Бота на стратегию «Кости» ⚠ Не забудьте поставить особые уведомления на Бота, и ждите сигнала на валуйные ситуации!");
       ctx.reply( "Удачи! По всем вопросам пишите @BetgamesTV_Admin"); 
      ctx.reply('Бот отслежки запущен!')
      global.time = setInterval(request2, 40000)
   }
   good()
}
)

bot.hears('/end', async (ctx) => {

   try {
      clearInterval(time);

      ctx.reply("Пока");
   } catch (err) {
      ctx.reply("Этот бот и так выключен");
   }
})

bot.launch()

