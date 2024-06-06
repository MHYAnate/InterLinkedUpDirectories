import Image from "next/image";
import styles from "./styles.module.css";

export default function AboutUs() {
	return (
		<div className={styles.aboutUs}>
			<div className={styles.cardCover}>
				<div className={styles.cardTitle}>
					<span className={styles.cardTitleSpan}>Who We Are</span>
				</div>
				<div className={styles.cardBody}>
					<p className={styles.introHeader}>
						Inter Linked Up Directories
						<span className={styles.introText}>
							{" "}
							Your Simplified Workforce Solution.
						</span>
					</p>
					<p className={styles.para}>
						Inter Linked Up Directories is your one-stop platform designed to
						streamline your workforce experience. We recognize the significance
						of strong connections within the professional landscape.
					</p>
					<span className={styles.cardTitleSpan}>Connecting You to What Matters</span>
					<p className={styles.para}>
					Whether you require assistance with automotive maintenance and repair, home improvement projects, or personalized services, Inter Linked Up Directories has you covered. We connect you with qualified vendors, available vacancies, and a user-friendly marketplace to address a wide range of needs, all tailored to your specific requirements.
					</p>
					<span className={styles.cardTitleSpan}>Our Services</span>
					<ol className={styles.para}>
						<li><span className={styles.highlighted}>Job Seekers</span> Find your perfect position with our extensive job board.</li>
						<li> <span className={styles.highlighted}>Employers </span>Post job vacancies and connect with top talent.</li>
						<li><span className={styles.highlighted}>Clients</span> Access to a pool of competative vendors within our extensive service categories.</li>
						<li><span className={styles.highlighted}>Vendors</span> Showcase your services and reach a wider audience.</li>
						<li><span className={styles.highlighted}>Buyers, Sellers and leasers</span> Access a convenient marketplace for various goods and services.</li>
					</ol>
					<span className={styles.cardTitleSpan}>Experience the Inter Linked Up Advantage</span>
					<ol className={styles.para}>
						<li><span className={styles.highlighted}>Simplified Search Process</span> Find what you need quickly and easily</li>
						<li> <span className={styles.highlighted}>Qualified Connections </span>Get connected with trusted goods or services vendors and employers.</li>
						<li><span className={styles.highlighted}>Tailored Solutions</span> We cater to your individual needs.</li>
					</ol>
					<p className={styles.para}>Inter Linked Up Directories is your comprehensive platform for a seamless and connected workforce experience.</p>
				</div>
			</div>
			<div className={styles.cardCover}>
				<div className={styles.cardTitle}>
					<span className={styles.cardTitleSpan}>Our Vission</span>
				</div>
				<div className={styles.cardBody}>
					<p className={styles.para}>
					We envision a world where seamless connections empower individuals and businesses to achieve their goals. Through our platform, users can effortlessly discover trusted service providers, explore a vibrant marketplace, and access a comprehensive job board, ultimately simplifying daily tasks, strengthening the professional landscape, and unlocking human potential.
					</p>
					<div className={styles.cardTitle}>
					<span className={styles.cardTitleSpan}>Our Mission</span>
				</div>
					<p className={styles.para}>
						Our mission is to simplify and streamline the process of finding trusted Goods or Service vendors and employers to potential clients and job seakers.
					</p>
					<p className={styles.para}>
						We believe in empowering clients, employers, and job seekers with the tools and information they need to make informed decisions while ensuring vendors, employers receive the visibility they deserve.
					</p>
					<p className={styles.cardTitleSpan}>We strive to</p>
					<ol className={styles.para}>
						<li>
							Connect individuals  and employers with reliable and skilled vendors and Job Seakers within their locality.
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
			<div className={styles.cardCover}>
				<div className={styles.cardTitle}>
					<span className={styles.cardTitleSpan}>What We Offer</span>
				</div>
				<div className={styles.cardBody}>
				<p className={styles.para}>
						<span className={styles.highlightedTitle}>
							Comprehensive Categories:
						</span>{" "}
						Our directory boasts a diverse range of categories categorized into
						three main sections, Each category further expands into specific
						subcategories, making it easy to find the exact service you require.
						as listed below
					</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>
								Comprehensive Vendor Database:
								</span>{" "}
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Market space:
								</span>{" "}
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Vacancy Board:
								</span>{" "}
							</p>
						</li>
					</ol>
					<p className={styles.para}>
						<span className={styles.highlightedTitle}>
							Comprehensive Vendor Database:
						</span>{" "}
						Our directory boasts a diverse range of vendors categorized into
						three main sections, Each category further expands into specific
						subcategories, making it easy to find the exact service you require.
						as listed below
					</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>
									Personal Service Category:
								</span>{" "}
								This category encompasses a wide range of personal services
								tailored to meet your individual needs. Whether you&lsquo;re
								looking for home lessons, maid services, laundry services, or
								any other personalized service, our directory provides
								comprehensive listings with vendors&lsquo; names, addresses, and
								phone numbers.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Automotive Service Category:
								</span>{" "}
								For all your automotive needs, look no further than our
								directory. From mechanical services to auto spray, panel
								beating, and wheel balancing services, we connect you with
								reputable vendors who are experts in their respective fields.
								Whether it&lsquo;s routine maintenance or major repairs, you can
								rely on our directory to find the right automotive service
								provider for the job.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Maintenance Service Category:
								</span>{" "}
								Keeping your property well-maintained is essential for its
								longevity and functionality. Our maintenance service category
								includes a diverse range of services such as painting,
								bricklaying, plumbing, and more. Whether you&lsquo;re renovating
								your home or in need of regular maintenance, our directory
								features trusted vendors who can deliver quality services
								tailored to your requirements.
							</p>
						</li>
					</ol>
					<p className={styles.para}>
						<span className={styles.highlightedTitle}>
							Detailed User profiles:
						</span>{" "}
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
					<p className={styles.para}>
						<span className={styles.highlightedTitle}>
							Vendors and Employers Search Without Log In:
						</span>{" "}
						You can search for vendors and Employers and access their basic information
						without Loging in.
					</p>
					<p className={styles.para}>
						<span className={styles.highlightedTitle}>
							Easy-to-use search filters :
						</span>{" "}
						Narrow down your search by category, location and specific address
						keywords.
					</p>
					<p className={styles.para}>
						<span className={styles.highlightedTitle}>Free to use:</span> You can
						search for vendors and employers and access their basic information for free.
					</p>
				</div>
			</div>
			<div className={styles.cardCover}>
				<div className={styles.cardTitle}>
					<span className={styles.cardTitleSpan}>Why Choose Us</span>
				</div>
				<div className={styles.cardBody}>
					<p className={styles.highlightedTitle}>Benefits for Clients:</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>
									Save Time and Effort:
								</span>{" "}
								Eliminate the hassle of searching through endless online
								listings and recommendations. Find all the necessary vendors in one centralized location.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Make Informed Decisions:
								</span>{" "}
								Access detailed information about each vendor to ensure they meet your specific requirements.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Enjoy a seamless experience:
								</span>{" "}
								Navigate our user-friendly platform with ease and find the
								services you need in minutes.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
								Competitive Advantage:
								</span>{" "}
								Compare pricing and discover qualified professionals offering competitive rates, maximizing your value.
							</p>
						</li>
					</ol>
					<p className={styles.highlightedTitle}>Benefits for Vendors:</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>Increase visibility:</span>{" "}
								Reach a wider audience of potential clients actively seeking services in your domain.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
									Simplify client communication:
								</span>{" "}
								Provide direct contact information to enable clients to easily connect with you.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Expand your network:</span>{" "}
								Become part of a thriving community of reliable vendors,
								fostering potential collaborations and connections.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Professional Development:</span>{" "}
								Access valuable resources and opportunities to enhance your skills and offerings, staying competitive in the marketplace.
							</p>
						</li>
					</ol>
					<p className={styles.highlightedTitle}>Benefits for Employers:</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>Top Talent Acquisition:</span>{" "}
								Attract skilled and qualified candidates by leveraging our extensive job board, ensuring a pool of qualified applicants for your open positions.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
								Efficient Hiring Process:
								</span>{" "}
								Simplify the recruitment by providing relevant contact informations, saving time and resources.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Expand your network:</span>{" "}
								Gain access to a wider talent pool beyond traditional channels, allowing you to find the perfect fit for your company's needs.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Employer Branding:</span>{" "}
								Showcase your company culture and career opportunities through a dedicated employer profile, attracting high-caliber candidates.
							</p>
						</li>
					</ol>
					<p className={styles.highlightedTitle}>Benefits for Job Seekers:</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>Dream Job Discovery:</span>{" "}
								Access a comprehensive job board featuring diverse opportunities across various industries, allowing you to explore your career aspirations.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
								Streamlined Applications:
								</span>{" "}
								Simplify the Application process by providing relevant contact informations for direct access to recruiters, saving time and resources.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Expand your network:</span>{" "}
								Gain access to a wider talent pool beyond traditional channels, allowing you to find the perfect fit for your company's needs.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Career Growth Potential:</span>{" "}
								Connect with potential employers and discover opportunities to expand your skillset and pursue career advancement.
							</p>
						</li>
					</ol>
					<p className={styles.highlightedTitle}>Benefits for Buyers, Sellers, and Lessors:</p>
					<ol className={styles.para}>
						<li>
							<p>
								<span className={styles.highlighted}>Vibrant Marketplace:</span>{" "}
								Explore a vast array of goods and services in one convenient location. Buy, sell, and lease with ease through our secure transaction processing system.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>
								Unique Discoveries:
								</span>{" "}
								Find local sellers and unique offerings you won't find anywhere else, adding variety and personalization to your shopping experience.  
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Peace of Mind:</span>{" "}
								Benefit from secure transactions processed through our platform, providing protection against fraudulent activity.
							</p>
						</li>
						<li>
							<p>
								<span className={styles.highlighted}>Competitive Market:</span>{" "}
								Compare prices and negotiate deals to ensure you get the best value for your purchases or rentals.
							</p>
						</li>
					</ol>
				</div>
			</div>
			<div className={styles.cardCover}>
				<div className={styles.cardTitle}>
					<span className={styles.cardTitleSpan}>Contact Us</span>
				</div>
				<div className={styles.cardBody}>
					<p className={styles.para}>
					Join us on our mission to empower individuals and businesses through seamless connections!
					</p>
					<p className={styles.para}>
						We are continuously working to expand our service categories and enhance our platform to cater to the evolving needs of our users. If you have any questions, suggestions, or need assistance navigating our platform, please don&lsquo;t hesitate to contact us.
					</p>
					<p>
						<span className={styles.highlightedTitle}>Text only :</span> 07043979846
					</p>
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
		</div>
	);
}
