const DMCA = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 md:px-16 py-12">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center sm:text-left">
        DMCA Disclaimer
      </h1>

      {/* Content */}
      <section className="space-y-6 max-w-4xl mx-auto text-sm sm:text-base text-gray-300">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p>
            Vidjoy is a platform that provides metadata about movies and TV series fetched from The Movie Database (TMDB) API. Additionally, we embed trailers from YouTube and provide iframe links to third-party websites for streaming content. We do not host or store any copyrighted media files, movies, or TV series on our servers.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Third-Party Content</h2>
          <p>
            All embedded content, including movie trailers and third-party streams, is hosted by external websites. Vidjoy acts solely as an intermediary by providing links to publicly available content. We do not have control over the content hosted on third-party websites and are not responsible for their availability, legality, or copyright compliance.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Copyright Compliance</h2>
          <p>
            We respect the intellectual property rights of others and are committed to complying with the Digital Millennium Copyright Act (DMCA) and similar laws worldwide. If you believe that any content on our platform infringes your copyright, please notify us immediately.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Filing a DMCA Complaint</h2>
          <p>
            If you are a copyright owner or an agent authorized to act on behalf of one, and you believe that content on our platform infringes your copyright, please submit a written notice containing the following information:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your Contact Information: Full name, mailing address, email, phone number</li>
            <li>Description of the Copyrighted Work</li>
            <li>Infringing Content Details: URL(s) of the infringing material</li>
            <li>Statement of Good Faith</li>
            <li>Statement of Accuracy under penalty of perjury</li>
            <li>Signature: Physical or electronic</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Contact Information for DMCA Notices</h2>
          <p>
            Email: <a href="mailto:moviekex@proton.me" className="text-blue-400 hover:underline">moviekex@proton.me</a>
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Counter-Notification</h2>
          <p>
            If you believe content has been wrongly removed, you may file a counter-notification including identification of removed material, statement under penalty of perjury, and consent to jurisdiction.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Important Note</h2>
          <p>
            By using our platform, you agree to comply with applicable copyright laws. Repeated infringement may result in suspension or termination of your account or access to services.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DMCA;
