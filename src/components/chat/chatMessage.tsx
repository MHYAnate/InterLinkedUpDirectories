import styles from "./styles.module.css";
import Image from "next/image";

interface Chat {
	chat: string;
	senderId: string;
	senderName: string;
	senderPic: string;
	chatImg: string;
	user: string;
	Yearstamp: string,
	monthStamp: string;
	dayStamp: string;
	minuteStamp: string;
	timeStamp: string;
}

export default function ChatMessage(props: Chat) {
	const { chat, senderId, senderName, senderPic, user, chatImg, timeStamp } = props;

	return (
			<div className={ senderId === user? styles.sent : styles.received}>
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
						{chatImg?
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
						:<></>}
						<div className={styles.chat}>{chat}</div>
            <div className={styles.chatFooter}>
              {timeStamp}
            </div>
					</div>
				</div>
			</div>
	);
}
