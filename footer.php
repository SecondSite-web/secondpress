<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SecondPress
 */

?>

	<footer id="colophon" class="site-footer">
        <div class="container-fluid">
            <div class="row p-3">
                <div class="col text-center">
                    <div class="site-info">
                        <a href="<?php echo esc_url( __( 'https://secondsite.xyz/', 'secondpress' ) ); ?>">
                            <?php
                            /* translators: %s: CMS name, i.e. WordPress. */
                            printf( esc_html__( 'Proudly powered by %s', 'secondpress' ), 'SecondSite' );
                            ?>
                        </a>
                        <span class="sep"> | </span>
                        <?php
                        /* translators: 1: Theme name, 2: Theme author. */
                        printf( esc_html__( '%1$s Theme', 'secondpress' ), '<a href="http://secondsite.xyz/">SecondPress</a>' );
                        ?>
                    </div><!-- .site-info -->
                </div>
            </div>
        </div>

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
