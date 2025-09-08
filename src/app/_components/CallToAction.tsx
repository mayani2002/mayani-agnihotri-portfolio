
'use client';

import { personalInfo } from "../../data/personal";

const CallToAction: React.FC = () => {
    return (
        <div>
            {/* Call to Action */}
            <div className="mx-8  p-8 bg-gradient-brand from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-2xl border border-purple-400 dark:border-purple-700 text-center" >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 font-kalam">
                    Ready to work together?
                </h4>
                <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">
                    I'm always interested in discussing new opportunities and projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <a
                        href={personalInfo.socialLinks.email}
                        className="px-6 py-2  text-purple dark:text-gray-700 rounded-full bg-accent-light dark:bg-white hover:text-white hover:bg-purple-400 duration-200 text-sm font-medium"
                    >
                        Get In Touch
                    </a>
                    <a
                        href={personalInfo.resumeUrl}
                        download="Mayani-Agnihotri-Resume.pdf"
                        className="px-6 py-2 border rounded-full hover:text-white hover:bg-purple-400 transition-all duration-200 text-sm font-medium"
                    >
                        Download Resume
                    </a>
                </div>
            </div >
        </div>
    );
};
export default CallToAction;