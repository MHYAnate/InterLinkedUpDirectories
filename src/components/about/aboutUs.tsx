import Image from "next/image";
import styles from "./styles.module.css";

export default function AboutUs() {
	return (
		<div className={styles.aboutUsBodyCover}>
			<div className={styles.seperatorDiv}>
			WHO WE ARE
			</div>
			<div className={styles.rightContainer1}>
				<div className={styles.rightImg1Cover}>
					<Image
						object-fit="cover"
						className={styles.img1}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/g5.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.rightTextCover1}>
					<div className={styles.cardTitle}>
					</div>
					<p className={styles.introHeader}>Inter Linked Up Directories</p>
					<p className={styles.introText1}>
						We are your one-stop platform designed to streamline your workforce
						experience.
					</p>
					<span className={styles.inHighligthTextGold}>
						{" "}
						Your Simplified Workforce Solution.
					</span>
				</div>
			</div>
			<div className={styles.leftContainer1}>
				<div className={styles.leftImg1Cover}>
					<Image
						object-fit="cover"
						className={styles.img1}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/connect.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.leftTextCover1}>
					<span className={styles.cardTitleSpan}>
						Connecting You to What Matters
					</span>
					<p className={styles.para}>
						Whether you require assistance with{" "}
						<span className={styles.inHighligthTextGreen}>
							automotive maintenance and repair, home improvement projects, or
							personalized services
						</span>
						,
					</p>{" "}
					<p className={styles.para}>
						<span className={styles.inHighligthTextBoldGreen}>
							{" "}
							Inter Linked Up Directories
						</span>{" "}
						has you covered. We connect you with qualified vendors, available
						vacancies, and a user-friendly marketplace to address a wide range
						of needs .
					</p>
					<span className={styles.inHighligthTextGold}>
						{" "}
						all tailored to your specific requirements
					</span>
				</div>
			</div>

			<div className={styles.rightContainer2}>
				<div className={styles.rightImg2Cover}>
					<Image
						object-fit="cover"
						className={styles.img2}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/who.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.rightTextCover2}>
					<span className={styles.cardTitleSpan}>Our Services Cater for</span>
					<ol className={styles.para}>
						<li>
							<span className={styles.highlighted}>Job Seekers</span> Find your
							perfect position with our extensive job board.
						</li>
						<li>
							{" "}
							<span className={styles.highlighted}>Employers </span>Post job
							vacancies and connect with top talent.
						</li>
						<li>
							<span className={styles.highlighted}>Clients</span> Access to a
							pool of competative vendors within our extensive service
							categories.
						</li>
						<li>
							<span className={styles.highlighted}>Vendors</span> Showcase your
							services and reach a wider audience.
						</li>
						<li>
							<span className={styles.highlighted}>
								Buyers, Sellers and leasors
							</span>{" "}
							Access a convenient marketplace for various goods and services.
						</li>
					</ol>
				</div>
			</div>

			<div className={styles.seperatorDiv}>
				Experience the Inter Linked Up Advantage
			</div>

			<div className={styles.containDiv}>
      
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Simplified Search Process</span>
        <p> Find what you need quickly and easily</p>
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/filter.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Qualified Connections </span>
        <p> Get connected with trusted goods or services vendors and employers.</p>
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/connecting.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Tailored Solutions</span>
        <p> We cater to your individual needs.</p>
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/ts.jpg"
						priority={true}
						unoptimized
					/>
				</div>
			</div>

      <div className={styles.seperatorDiv}>
      Inter Linked Up Directories is your comprehensive platform for a seamless and connected workforce experience.
			</div>

			<div className={styles.leftContainer2}>
				<div className={styles.leftImg2Cover}>
					<Image
						object-fit="cover"
						className={styles.img2}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/v1.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.leftTextCover2}>
        <span className={styles.cardTitleSpan}>Our Vision</span>
        <p className={styles.para}>
					We envision a world where seamless connections empower individuals and businesses to achieve their goals. Through our platform, users can effortlessly discover trusted service providers, explore a vibrant marketplace, and access a comprehensive job board, ultimately simplifying daily tasks, strengthening the professional landscape, and unlocking human potential.
					</p>
        </div>
			</div>

			<div className={styles.rightContainer3}>
				<div className={styles.rightImg3Cover}>
					<Image
						object-fit="cover"
						className={styles.img3}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/mision.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.rightTextCover3}>
        <span className={styles.cardTitleSpan}>Our Mission</span>
        <p className={styles.para}>
						Our mission is to simplify and streamline the process of finding trusted Goods or Service vendors and employers to potential clients and job seakers.
					</p>
					<p className={styles.para}>
						We believe in empowering clients, employers, and job seekers with the tools and information they need to make informed decisions while ensuring vendors, employers receive the visibility they deserve.
					</p>
        </div>
			</div>
			<div className={styles.leftContainer3}>
				<div className={styles.leftImg3Cover}>
					<Image
						object-fit="cover"
						className={styles.img3}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/benefit.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.leftTextCover3}>
        <p className={styles.cardTitleSpan}>We strive to</p>
        <ol className={styles.para}>
						<li>
							Connect individuals  and employers with reliable, skilled vendors and Job Seakers within their locality.
						</li>
						<li>
							Offer a diverse range of service categories to address your
							various needs.
						</li>
						<li>
							Boost Competativeness to Ensure the quality and trustworthiness of Clients, vendors and Employers listed on our platform.
						</li>
						<li>
							Provide a user-friendly and accessible experience for all users.
						</li>
					</ol>
        </div>
			</div>

			<div className={styles.seperatorDiv}>What We Offer</div>
     

      <div className={styles.containDiv}>
      
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Comprehensive Vendor Database</span>
        
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/dataBase.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Robust Market Place</span>
        
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/commerce.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Extensive Job Board</span>
        
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/vacancy.jpg"
						priority={true}
						unoptimized
					/>
				</div>
			</div>

      <div className={styles.seperatorDiv}>We Offer Users a diverse range of directories categorized into three main sections.</div>

      

			<div className={styles.rightContainer1}>
				<div className={styles.rightImg1Cover}>
					<Image
						object-fit="cover"
						className={styles.img1}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/dataBase.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.rightTextCover1}>
        <span className={styles.cardTitleSpan}>
							Comprehensive Vendor Database:
						</span>
            <p className={styles.para}>
						Our directory boasts a diverse range of vendors categorized into
						three main sections, Each category further expands into specific
						subcategories, making it easy to find the exact service you require.
						as listed below
					</p>
        </div>
			</div>

      
      <div className={styles.containDiv}>
      
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Personal Service Category</span>
        <p>This category encompasses a wide range of personal services tailored to meet your individual needs. Whether you&lsquo;re looking for home lessons, maid services, laundry services, or any other personalized service, our directory provides comprehensive listings with vendors&lsquo; names, addresses, and phone numbers.</p>
        
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/personal.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Maintenance Service Category</span>
        <p>Keeping your property well-maintained is essential for its longevity and functionality. Our maintenance service category includes a diverse range of services such as painting bricklaying, plumbing, and more. Whether you&lsquo;re renovating your home or in need of regular maintenance, our directory features trusted vendors who can deliver quality services tailored to your requirements.</p>
        
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/maintenance.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.miniDiv}>
        <span className={styles.highlighted}>Automotive Service Category</span>
        <p>	For all your automotive needs, look no further than our directory. From mechanical services to auto spray, panel beating, and wheel balancing services, we connect you with reputable vendors who are experts in their respective fields. Whether it&lsquo;s routine maintenance or major repairs, you can rely on our directory to find the right automotive service provider for the job.</p>
        
					<Image
						object-fit="cover"
						className={styles.imgMiniDiv}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/automotive.jpg"
						priority={true}
						unoptimized
					/>
				</div>
			</div>

			<div className={styles.leftContainer1}>
				<div className={styles.leftImg1Cover}>
					<Image
						object-fit="cover"
						className={styles.img1}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/commerce.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.leftTextCover1}>
        <span className={styles.cardTitleSpan}>
        Robust Market space:
						</span>
            <p className={styles.para}>
            Our Robust Market space empower individuals and businesses to connect and thrive through seamless buying, selling, and leasing experience 
					</p>
        </div>
			</div>

      <div className={styles.containDiv}>
      
      <div className={styles.miniDiv}>
      <span className={styles.highlighted}>Effortless Shop Creation</span>
      <p>Open your own virtual storefront with ease. showcase your brand story, and upload a variety of products</p>
      
        <Image
          object-fit="cover"
          className={styles.imgMiniDiv}
          alt="Picture of the author"
          quality={100}
          width={100}
          height={100}
          src="/service/q1.jpg"
          priority={true}
          unoptimized
        />
      </div>
      <div className={styles.miniDiv}>
      <span className={styles.highlighted}>Inventory Management</span>
      <p>Effortlessly add, edit, and manage your product listings within the app. Track inventory levels, adjust pricing, and monitor sales performance.</p>
      
        <Image
          object-fit="cover"
          className={styles.imgMiniDiv}
          alt="Picture of the author"
          quality={100}
          width={100}
          height={100}
          src="/service/g2.jpg"
          priority={true}
          unoptimized
        />
      </div>
      <div className={styles.miniDiv}>
      <span className={styles.highlighted}>Flexible Listing Options</span>
      <p>	Choose between individual listings for unique items or showcase a curated collection through your shop, either you are selling or leasing a product we gotyou covered.</p>
      
        <Image
          object-fit="cover"
          className={styles.imgMiniDiv}
          alt="Picture of the author"
          quality={100}
          width={100}
          height={100}
          src="/service/y2.jpg"
          priority={true}
          unoptimized
        />
      </div>
    </div>

			<div className={styles.rightContainer2}>
				<div className={styles.rightImg2Cover}>
					<Image
						object-fit="cover"
						className={styles.img2}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/vacancy.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.rightTextCover2}>
        <span className={styles.cardTitleSpan}>
        Extensive Job Board:
						</span>
            <p className={styles.para}>
            We connect talented individuals with exciting opportunities, empowering businesses of all sizes to build their dream teams.
					</p>
        </div>
			</div>

      <div className={styles.containDiv}>
      
      <div className={styles.miniDiv}>
      <span className={styles.highlighted}>Post Individual Vacancies:</span>
      <p>	Quickly list specific open positions with clear descriptions and requirements.</p>
      
        <Image
          object-fit="cover"
          className={styles.imgMiniDiv}
          alt="Picture of the author"
          quality={100}
          width={100}
          height={100}
          src="/service/j5.jpg"
          priority={true}
          unoptimized
        />
      </div>
      <div className={styles.miniDiv}>
      <span className={styles.highlighted}>Build Your Company Profile:</span>
      <p>Showcase your company culture, values, and career opportunities to attract top talent.</p>
      
        <Image
          object-fit="cover"
          className={styles.imgMiniDiv}
          alt="Picture of the author"
          quality={100}
          width={100}
          height={100}
          src="/service/i2.jpg"
          priority={true}
          unoptimized
        />
      </div>
      <div className={styles.miniDiv}>
      <span className={styles.highlighted}>Vast Job Search:</span>
      <p>	Explore a comprehensive database of job opportunities across diverse industries and locations.</p>
      
        <Image
          object-fit="cover"
          className={styles.imgMiniDiv}
          alt="Picture of the author"
          quality={100}
          width={100}
          height={100}
          src="/service/j1.jpg"
          priority={true}
          unoptimized
        />
      </div>
    </div>

		
		<div className={styles.seperatorDiv}> Detailed User profiles</div>

			<div className={styles.leftContainer2}>
				<div className={styles.leftImg2Cover}>
					<Image
						object-fit="cover"
						className={styles.img2}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/useProfile.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.leftTextCover2}>
       
            <p className={styles.para}>
            Each User profile within our directory includes essential details
						like:
					</p>
          <ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>User Name:</span> Clearly
								identify the individual or business providing the service.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Contact Information:</span>{" "}
								Each User listing includes their name, contact information and
								a description of their services to directly contact potential
								Users.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Service Descriptions:
								</span>{" "}
								Gain a comprehensive understanding of the services offered by
								each User, allowing you to make informed choices.
							</p>
						</li>
					</ol>
        </div>
			</div>
      <div className={styles.seperatorDiv}>Contact Us</div>
			<div className={styles.rightContainer2}>
				<div className={styles.leftImg3Cover}>
					<Image
						object-fit="cover"
						className={styles.img3}
						alt="Picture of the author"
						quality={100}
						width={100}
						height={100}
						src="/service/ct1.jpg"
						priority={true}
						unoptimized
					/>
				</div>
				<div className={styles.leftTextCover3}>
        <p className={styles.para}>
					Join us on our mission to empower individuals and businesses through seamless connections!
					</p>
					<p className={styles.para}>
						We are continuously working to expand our service categories and enhance our platform to cater to the evolving needs of our users. If you have any questions, suggestions, or need assistance navigating our platform, please don&lsquo;t hesitate to contact us.
					</p>
          <p>
						<span className={styles.highlightedTitle}>Text only :</span> 07043979846
					</p>
					<p></p>
          <p>
						<span className={styles.highlightedTitle}>WhatsApp only :</span>{" "}
						07019923947
					</p>
					<p>
						<span className={styles.highlightedTitle}>Email :</span>{" "}
						interlinkedupdirectories@gmail.com{" "}
					</p>
        </div>
			</div>
      <div className={styles.seperatorDiv2}><p className={styles.noteP}>EXCELLENCE</p>
      <span className={styles.note}>For all Mankind</span></div>
		</div>
	);
}
