from TikTokLive import TikTokLiveClient
from TikTokLive.types.events import CommentEvent, ConnectEvent

def tic():

    # Instantiate the client with the user's username
    client: TikTokLiveClient = TikTokLiveClient(unique_id="@byjcomunicaciones")



    # Define how you want to handle specific events via decorator
    @client.on("connect")
    async def on_connect(_: ConnectEvent):
        
        if client.room_id != None:
            print("Connected to Room ID:", client.room_id)
        else:
            print("no se pudo conectar")
        


    # Notice no decorator?
    async def on_comment(event: CommentEvent):
        #print(f"{event.user.nickname} : {event.comment}")
        comentario = f"{event.user.nickname} :{event.comment}"
        comentario1 = str(comentario)
        print(comentario1)
        return comentario1

        
        

    # Define handling an event via a "callback"
    client.add_listener("comment", on_comment)

    client.run()


    
   

if __name__ == '__main__':
    # Run the client and block the main thread
    # await client.start() to run non-blocking
    tic()
    