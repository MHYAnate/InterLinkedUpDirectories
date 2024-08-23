import styles from "./styles.module.css";
import Image from "next/image";

interface Chat {
	chat: string;
	senderId: string;
	senderName: string;
	senderPic: string;
	createdAt: any;
	chatImg: string;
	user: {
		uid: string;
	};
}

export default function ChatMessage(props: Chat) {
	const { chat, senderId, senderName, senderPic, createdAt, user, chatImg } = props;

	return (
		<div className={senderId === user?.uid ? styles.sent : styles.received}>
			<div className={styles.chatContainer}>
				<div className={styles.chtImg}>
					<Image
						object-fit="cover"
						className={styles.senderPic}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src={`${senderPic}`}
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.chatBodyCover}>
					<div className={styles.nameDisplay}>{`${senderName}`}</div>
					<div className={styles.chatBody}>
						{chatImg?<div className={styles.chatImgCover}>
							<div className={styles.chatImg}>
								<Image
									object-fit="cover"
									className={styles.senderPic}
									alt="Picture of the author"
									quality={100}
									width={100}
									height={100}
									src={`${chatImg}`}
									priority={true}
									unoptimized
								/>
							</div>
						</div>:<></>}
						<div className={styles.chat}>{chat}</div>
            <div className={styles.chatFooter}>
              <div></div>
              <div className={styles.timeStamp}>{createdAt}</div>
            </div>
						
					</div>
				</div>
			</div>
		</div>
	);
}
