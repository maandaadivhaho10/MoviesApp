import React from "react";

const DMCA = () => {
  return (
    <main
      role="main"
      className="bg-black text-gray-200 min-h-screen pt-24 pb-24"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Combined heading + intro */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            DMCA Disclaimer
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
            Vidjoy is a platform that provides metadata about movies and TV
            series fetched from The Movie Database (TMDB) API. Additionally, we
            embed trailers from YouTube and provide iframe links to third-party
            websites for streaming content. We do not host or store any
            copyrighted media files, movies, or TV series on our servers.
          </p>
        </section>

        {/* Rest of sections */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
            Third-Party Content
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            All embedded content, including movie trailers and third-party
            streams, is hosted by external websites. Vidjoy acts solely as an
            intermediary by providing links to publicly available content. We do
            not have control over the content hosted on third-party websites and
            are not responsible for their availability, legality, or copyright
            compliance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
            Copyright Compliance
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            We respect the intellectual property rights of others and are
            committed to complying with the Digital Millennium Copyright Act
            (DMCA) and similar laws worldwide. If you believe that any content
            on our platform infringes your copyright, please notify us
            immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
            Filing a DMCA Complaint
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            If you are a copyright owner or an agent authorized to act on behalf
            of one, and you believe that content on our platform infringes your
            copyright, please submit a written notice containing the following
            information:
          </p>

          <ul className="list-disc list-inside space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              <strong className="text-white">Your Contact Information:</strong>{" "}
              Your full name, mailing address, email address, phone number.
            </li>
            <li>
              <strong className="text-white">
                Description of the Copyrighted Work:
              </strong>{" "}
              Provide a detailed description of the copyrighted material you
              claim has been infringed.
            </li>
            <li>
              <strong className="text-white">Infringing Content Details:</strong>{" "}
              Identify the URL(s) or other specific location(s) on our platform
              where the allegedly infringing material is located.
            </li>
            <li>
              <strong className="text-white">Statement of Good Faith:</strong>{" "}
              Include a statement that you have a good faith belief that the use
              of the copyrighted material is not authorized by the copyright
              owner, its agent, or the law.
            </li>
            <li>
              <strong className="text-white">Statement of Accuracy:</strong>{" "}
              A statement, under penalty of perjury, that the information in
              your notice is accurate and that you are the copyright owner or
              authorized to act on behalf of the copyright owner.
            </li>
            <li>
              <strong className="text-white">Signature:</strong> A physical or
              electronic signature of the copyright owner or their authorized
              agent.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
            Contact Information for DMCA Notices
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-2">
            Please send your DMCA notices to:
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            <strong className="text-white">Email:</strong>{" "}
            <a
              href="mailto:moviekex@proton.me"
              className="text-blue-400 hover:underline"
            >
              moviekex@proton.me
            </a>
          </p>
        </section>

        {/* Counter */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
            Counter-Notification
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            If you believe that content you have provided has been wrongly
            removed due to a DMCA notice, you may file a counter-notification
            with the same contact information above. Your counter-notification
            must include:
          </p>

          <ul className="list-disc list-inside space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              Identification of the material that has been removed or disabled
              and its original location.
            </li>
            <li>
              A statement under penalty of perjury that you have a good faith
              belief that the material was removed or disabled as a result of a
              mistake or misidentification.
            </li>
            <li>
              Your consent to the jurisdiction of the federal district court in
              your area (or the area in which you are located if outside the
              United States).
            </li>
          </ul>
        </section>

        {/* Note */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
            Important Note
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            By using our platform, you agree to comply with applicable copyright
            laws. Repeated infringement of copyrights may result in the
            suspension or termination of your account or access to our services.
          </p>
        </section>
      </div>
    </main>
  );
};

export default DMCA;
