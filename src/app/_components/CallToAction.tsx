
'use client';

import { personalInfo } from "../../data/personal";

const CallToAction: React.FC = () => {
    return (
        <div>
            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-2xl border border-gray-200 dark:border-gray-700 text-center" >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 font-kalam">
                    Ready to work together?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    I'm always interested in discussing new opportunities and projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <a
                        href={personalInfo.socialLinks.email}
                        className="px-6 py-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors duration-200 text-sm font-medium"
                    >
                        Get In Touch
                    </a>
                    <a
                        href={personalInfo.resumeUrl}
                        download="Mayani-Agnihotri-Resume.pdf"
                        className="px-6 py-2 border border-brand-primary text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all duration-200 text-sm font-medium"
                    >
                        Download Resume
                    </a>
                </div>
            </div >
        </div>
    );
};
export default CallToAction;